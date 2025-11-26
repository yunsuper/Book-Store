import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";

function BooksFilter() {
    const { category, selectedCategory, isNews, changeCategory, toggleNews } = useCategory();

    // const handelNews =()=>{
    //     const newSerchParams = new URLSearchParams(searchParams);
    //     newSerchParams.set("category_id", null)

    //     if(newSerchParams.get('news')){
    //         newSerchParams.delete('news');
    //     }else{
    //         newSerchParams.set('news', 'true');
    //     }
    // }

    return (
        <BooksFilterStyle>
            <div className="category">
                {category.map((item, index) => (
                    <Button
                        className={
                            !isNews && selectedCategory === item.id
                                ? "active"
                                : ""
                        }
                        type="button"
                        size="medium"
                        schema={
                            !isNews && selectedCategory === item.id
                                ? "primary"
                                : "normal"
                        }
                        key={item.id === null ? `all-${index}` : item.id}
                        onClick={() => changeCategory(item.id)}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>

            <div className="new">
                <Button
                    type="button"
                    size="medium"
                    schema={isNews ? "primary" : "normal"}
                    className={isNews ? "active" : ""}
                    onClick={toggleNews}
                >
                    신간
                </Button>
            </div>
        </BooksFilterStyle>
    );
}

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category {
        display: flex;
        gap: 8px;
    }

    /* ✅ active 스타일은 Button 내부에서 처리되므로 여기 필요 없음 */
`;

export default BooksFilter;
