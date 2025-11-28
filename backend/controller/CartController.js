const ensureAuthorization = require("../auth");
const jwt = require("jsonwebtoken");
const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

// 🔍 공통 인증 유효성 검사
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

// -------------------------------
// 📌 장바구니 담기
// -------------------------------
const addToCart = (req, res) => {
    const { book_id, quantity } = req.body;
    const authorization = ensureAuthorization(req, res);

    if (!isValidAuth(authorization)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인이 필요합니다.",
        });
    }

    const sql =
        "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
    const values = [book_id, quantity, authorization.id];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

// -------------------------------
// 📌 장바구니 아이템 조회
// -------------------------------
const getCartItems = (req, res) => {
    const { selected } = req.body || {};
    const authorization = ensureAuthorization(req, res);

    if (!isValidAuth(authorization)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인이 필요합니다.",
        });
    }

    let sql = `
        SELECT cartItems.id, book_id, title, summary, quantity, price 
        FROM cartItems 
        LEFT JOIN books ON cartItems.book_id = books.id 
        WHERE user_id = ?
    `;

    let values = [authorization.id];

    if (selected) {
        sql += " AND cartItems.id IN (?)";
        values.push(selected);
    }

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        results.forEach((item) => {
            item.bookId = item.book_id;
            delete item.book_id;
        });

        return res.status(StatusCodes.OK).json(results);
    });
};

// -------------------------------
// 📌 장바구니에서 아이템 삭제
// -------------------------------
const removeCartItem = (req, res) => {
    const cartItemId = req.params.id;
    const authorization = ensureAuthorization(req, res);

    if (!isValidAuth(authorization)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인이 필요합니다.",
        });
    }

    const sql = "DELETE FROM cartItems WHERE id = ?";

    conn.query(sql, cartItemId, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem,
};
