const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

// 🔐 비밀번호 해시 함수 (중복 코드 제거)
const makeHashedPassword = (password, salt) => {
    return crypto
        .pbkdf2Sync(password, salt, 10000, 10, "sha512")
        .toString("base64");
};

// ================================
// 회원가입
// ================================
const join = (req, res) => {
    const { email, password } = req.body;

    // 1) 이메일 중복 체크
    const checkSql = "SELECT * FROM users WHERE email = ?";
    conn.query(checkSql, email, (err, results) => {
        if (err) return res.status(StatusCodes.BAD_REQUEST).end();

        if (results.length > 0) {
            return res.status(StatusCodes.CONFLICT).json({
                message: "이미 존재하는 이메일입니다.",
            });
        }

        // 2) 비밀번호 해시 + salt 생성
        const salt = crypto.randomBytes(10).toString("base64");
        const hashed = makeHashedPassword(password, salt);

        const insertSql =
            "INSERT INTO users (email, password, salt) VALUES (?, ?, ?)";

        conn.query(insertSql, [email, hashed, salt], (err, results) => {
            if (err) return res.status(StatusCodes.BAD_REQUEST).end();

            return res.status(StatusCodes.CREATED).json({
                id: results.insertId,
                email,
            });
        });
    });
};

// ================================
// 로그인
// ================================
const login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    conn.query(sql, email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        // ❗ loginUser 없으면 즉시 반환 (죽기 전에)
        const loginUser = results[0];
        if (!loginUser) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "이메일 또는 비밀번호가 일치하지 않습니다.",
            });
        }

        // 저장된 salt로 비밀번호 해시 생성 후 비교
        const hashPassword = makeHashedPassword(password, loginUser.salt);

        if (loginUser.password === hashPassword) {
            // 🔥 JWT 발급
            const token = jwt.sign(
                { id: loginUser.id, email: loginUser.email },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: "1h",
                    issuer: "bookshop",
                }
            );

            // 쿠키 저장
            res.cookie("token", token, {
                httpOnly: true,
            });

            return res.status(StatusCodes.OK).json({
                id: loginUser.id,
                email: loginUser.email,
                token: token,
            });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "이메일 또는 비밀번호가 일치하지 않습니다.",
            });
        }
    });
};

// ================================
// 비밀번호 재설정 요청 (email만 체크)
// ================================
const passwordResetRequest = (req, res) => {
    const { email } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    conn.query(sql, email, (err, results) => {
        if (err) return res.status(StatusCodes.BAD_REQUEST).end();

        const user = results[0];

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "가입되지 않은 이메일입니다.",
            });
        }

        return res.status(StatusCodes.OK).json({ email });
    });
};

// ================================
// 비밀번호 재설정
// ================================
const passwordReset = (req, res) => {
    const { email, password } = req.body;

    // 새 salt + 새 해시
    const salt = crypto.randomBytes(10).toString("base64");
    const hashPassword = makeHashedPassword(password, salt);

    const sql = "UPDATE users SET password = ?, salt = ? WHERE email = ?";
    conn.query(sql, [hashPassword, salt, email], (err, results) => {
        if (err) return res.status(StatusCodes.BAD_REQUEST).end();

        if (results.affectedRows === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "해당 이메일이 존재하지 않습니다.",
            });
        }

        return res.status(StatusCodes.OK).json({ success: true });
    });
};

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset,
};
