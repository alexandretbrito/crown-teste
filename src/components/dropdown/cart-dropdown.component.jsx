import React from 'react'
import Button from "../button/button.component"
import "./cart-dropdown.styles.scss"

const DropDown = () => {
  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'></div>
      <Button>IR PARA O CHECKOUT</Button>
    </div>
  )
}

export default DropDown
