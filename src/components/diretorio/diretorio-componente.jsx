import Categorias from "../category/Categorias"
import './diretorio.styles.scss'

const Diretorio = ({base}) => {
  return (
    <div className="categories-container">
      {base.map((item) => (
        <Categorias key={item.id} category={item} />
      ))}
    </div>
  )
}

export default Diretorio
