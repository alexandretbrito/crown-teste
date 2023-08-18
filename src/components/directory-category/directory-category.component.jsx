import { Link } from 'react-router-dom';
import './directory-category.component.scss'

const DirectoryCategory = ({category}) => {
    const {title, imageUrl} = category;
    return (
      <Link className="directory-category-container" to={`shop/${title}`}>
      <div className="background-image" style={{
        backgroundImage: `url(${imageUrl})`
      }}></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </div>
    </Link>
    )
  }

export default DirectoryCategory
