const ensureAuthorization = require("../auth");
const jwt = require("jsonwebtoken");
const conn = require("../mariadb");
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

// ------------------------
// 좋아요 추가
// ------------------------
const addLike = (req, res) => {
    const book_id = req.params.id;
    const authorization = ensureAuthorization(req, res);

    if (!isValidAuth(authorization)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인이 필요한 서비스입니다.",
        });
    }

    const sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
    const values = [authorization.id, book_id];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
};

// ------------------------
// 좋아요 취소
// ------------------------
const removeLike = (req, res) => {
    const book_id = req.params.id;
    const authorization = ensureAuthorization(req, res);

    if (!isValidAuth(authorization)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인이 필요한 서비스입니다.",
        });
    }

    const sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
    const values = [authorization.id, book_id];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = {
    addLike,
    removeLike,
};
