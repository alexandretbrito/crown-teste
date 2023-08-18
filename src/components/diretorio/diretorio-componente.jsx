import DirectoryCategory from '../directory-category/directory-category.component'
import './diretorio.styles.scss'

const Diretorio = ({base}) => {
  return (
    <div className="directory-categories-container">
      {base.map((item) => (
        <DirectoryCategory key={item.id} category={item} />
      ))}
    </div>
  )
}

export default Diretorio
