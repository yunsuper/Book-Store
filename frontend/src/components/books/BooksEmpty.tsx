import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import Empty from "../common/Empty";

const SmileIcon = FaSmileWink as unknown as React.ComponentType;

function BooksEmpty() {
    return (
        <Empty title="검색 결과가 없습니다." icon={<SmileIcon />} description={<Link to="/books">전체 검색 결과로 이동</Link>} />
    );
}

export default BooksEmpty;
