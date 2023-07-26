
import DirectoryItem from '../directory-item/directory-item.components'
import './directory.styles.scss'

const Directory = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories?.map((item) => {

                return (
                    <DirectoryItem key={item?.id} categories={item} route={item.route} />
                )
            })}
        </div>
    )
}
export default Directory