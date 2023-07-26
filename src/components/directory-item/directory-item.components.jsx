import { useNavigate } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({ categories,  }) => {
    const { imageUrl, title,route } = categories
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <div className="directory-item-container" onClick={onNavigateHandler}>
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