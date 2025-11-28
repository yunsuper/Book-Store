const ensureAuthorization = require("../auth");
const jwt = require("jsonwebtoken");
const mariadb = require("mysql2/promise");
const { StatusCodes } = require("http-status-codes");

// 🔐 공통 인증 검증 함수
const isValidAuth = (authorization) => {
    return (
        authorization &&
        typeof authorization === "object" &&
        !(authorization instanceof ReferenceError) &&
        !(authorization instanceof jwt.TokenExpiredError) &&
        !(authorization instanceof jwt.JsonWebTokenError) &&
        authorization.id
    );
};

// 주문하기
const order = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "Bookshop",
        dateStrings: true,
    });

    const authorization = ensureAuthorization(req, res);

    if (!isValidAuth(authorization)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인 후 주문이 가능합니다.",
        });
    }

    const { items, delivery, totalQuantity, totalPrice, firstBookTitle } =
        req.body;

    // 1) delivery 테이블 삽입
    let sql =
        "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
    let values = [delivery.address, delivery.receiver, delivery.contact];
    const [deliveryResult] = await conn.execute(sql, values);
    const delivery_id = deliveryResult.insertId;

    // 2) orders 테이블 삽입
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
           VALUES (?, ?, ?, ?, ?)`;
    values = [
        firstBookTitle,
        totalQuantity,
        totalPrice,
        authorization.id,
        delivery_id,
    ];
    const [orderResult] = await conn.execute(sql, values);
    const order_id = orderResult.insertId;

    // 3) 주문 아이템 조회
    sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
    const [orderItems] = await conn.query(sql, [items]);

    if (orderItems.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "장바구니에서 가져올 책이 없습니다.",
        });
    }

    // 4) orderedBook 테이블 삽입
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

    const orderedValues = orderItems.map((item) => [
        order_id,
        item.book_id,
        item.quantity,
    ]);

    await conn.query(sql, [orderedValues]);

    // 5) 장바구니에서 제거
    await deleteCartItems(conn, items);

    // camelCase 변환
    orderItems.forEach((item) => {
        item.bookId = item.book_id;
        delete item.book_id;
    });

    return res.status(StatusCodes.OK).json({
        items: orderItems,
        delivery,
        totalQuantity,
        totalPrice,
        firstBookTitle,
    });
};

// 장바구니 삭제
const deleteCartItems = async (conn, items) => {
    let sql = `DELETE FROM cartItems WHERE id IN (?)`;
    return await conn.query(sql, [items]);
};

// 주문 목록 조회
const getOrders = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "Bookshop",
        dateStrings: true,
    });

    const authorization = ensureAuthorization(req, res);

    if (!isValidAuth(authorization)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인 후 이용 가능합니다.",
        });
    }

    let sql = `
        SELECT orders.id, created_at, address, receiver, contact, 
               book_title, total_quantity, total_price                  
        FROM orders 
        LEFT JOIN delivery ON orders.delivery_id = delivery.id 
        WHERE orders.user_id = ?
    `;

    const [rows] = await conn.query(sql, [authorization.id]);

    // camelCase 변환
    rows.forEach((row) => {
        row.bookTitle = row.book_title;
        delete row.book_title;

        row.createdAt = row.created_at;
        delete row.created_at;

        row.totalQuantity = row.total_quantity;
        delete row.total_quantity;

        row.totalPrice = row.total_price;
        delete row.total_price;
    });

    return res.status(StatusCodes.OK).json(rows);
};

// 주문 상세
const getOrderDetail = async (req, res) => {
    const orderId = req.params.id;

    const conn = await mariadb.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "Bookshop",
        dateStrings: true,
    });

    const authorization = ensureAuthorization(req, res);

    if (!isValidAuth(authorization)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인 후 이용 가능합니다.",
        });
    }

    let sql = `
        SELECT book_id, title, author, price, quantity                 
        FROM orderedBook 
        LEFT JOIN books ON orderedBook.book_id = books.id
        LEFT JOIN orders ON orderedBook.order_id = orders.id
        WHERE order_id = ? AND orders.user_id = ?
    `;

    const [rows] = await conn.query(sql, [orderId, authorization.id]);

    // camelCase 변환
    rows.forEach((row) => {
        row.bookId = row.book_id;
        delete row.book_id;
    });

    return res.status(StatusCodes.OK).json(rows);
};

module.exports = {
    order,
    getOrders,
    getOrderDetail,
};
