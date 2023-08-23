import { DirectoryCategoryContainer, BackgroundImage, BodyContainer } from './directory-category.styles';

const DirectoryCategory = ({category}) => {
    const {title, imageUrl} = category;
    return (
      <DirectoryCategoryContainer to={`shop/${title}`}>
      <BackgroundImage imageurl={imageUrl} />
        <BodyContainer>
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </BodyContainer>
    </DirectoryCategoryContainer>
    )
  }

export default DirectoryCategory
