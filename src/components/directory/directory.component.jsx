
import DirectoryItem from '../directory-item/directory-item.components'
import './directory.styles.scss'

const Directory = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories?.map((item) => {
                return (
                    <DirectoryItem key={item?.id} categories={item} />
                )
            })}
        </div>
    )
}
export default Directory