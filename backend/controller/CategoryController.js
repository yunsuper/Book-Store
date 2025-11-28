const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allCategory = (req, res) => {
    // console.log("🔥 CategoryController 로딩됨");
        // 카테고리 전체 목록 리스트
        let sql = "SELECT * FROM category";
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            results = results.map((result) => ({ // 어떤 필드는 유지, 어떤 필드는 바꿀지 명확하게 하기위해 새 객체를 만들어준다
                id: result.category_id,
                name: result.category_name,
            }));
    
            return res.status(StatusCodes.OK).json(results);
        });
}

module.exports = {
    allCategory
};