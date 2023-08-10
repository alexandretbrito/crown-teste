import React from 'react'
import './categoria.component.scss'

const Categorias = ({category}) => {
    const {title, imageUrl} = category;
    return (
      <div className="category-container">
      <div className="background-image" style={{
        backgroundImage: `url(${imageUrl})`
      }}></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>SHOP NOW</p>
      </div>
    </div>
    )
  }

export default Categorias
