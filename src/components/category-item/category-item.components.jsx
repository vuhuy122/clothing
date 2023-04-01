import './category-item.styles.scss'

const CategoryItem = ({ categories }) => {
    const { imageUrl, title } = categories
    return (
        <div className="category-container">
            <div className="background-image" style={{
                backgroundImage: (`url(${imageUrl})`)
            }}>
                <div className="category-body-container">
                    <h2>{title}</h2>
                    <p>shop now</p>
                </div>
            </div>

        </div>
    )
}
export default CategoryItem