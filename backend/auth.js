const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const ensureAuthorization = (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        console.log("received Jwt: ", authHeader);

        // Authorization 헤더가 없으면 (로그인 안한 상태)
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ReferenceError("no token");
        }

        // "Bearer xxx" → "xxx"만 추출
        const token = authHeader.split("Bearer ")[1];

        // 토큰 검증
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log("decoded token:", decoded);

        return decoded;
    } catch (err) {
        console.log(err.name, err.message);
        return err;
    }
};

module.exports = ensureAuthorization;
