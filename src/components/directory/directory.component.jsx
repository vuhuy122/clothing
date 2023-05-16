import CategoryItem from '../category-item/category-item.components';
import './directory.styles.scss'

const Directory = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories?.map((item) => {
                return (
                    <CategoryItem key={item?.id} categories={item} />
                )
            })}
        </div>
    )
}
export default Directory