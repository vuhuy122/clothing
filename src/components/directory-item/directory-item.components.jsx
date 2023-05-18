import './directory-item.styles.scss'

const DirectoryItem = ({ categories }) => {
    const { imageUrl, title } = categories
    return (
        <div className="directory-item-container">
            <div className="background-image" style={{
                backgroundImage: (`url(${imageUrl})`)
            }}>
                <div className="body">
                    <h2>{title}</h2>
                    <p>shop now</p>
                </div>
            </div>

        </div>
    )
}
export default DirectoryItem