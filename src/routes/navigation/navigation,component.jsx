import { useContext } from "react";
import { userSignOut, userAuthStateChangeListener,  } from "../../utils/firebase/firebase.utils";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crown } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import DropDown from "../../components/dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user-context.component";
import { CartContext } from "../../contexts/cart-context.component";
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  const signOutHandler = async () => {
    await userSignOut();
  }

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Crown />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            LOJA
          </Link>
          {currentUser ? (
            <Link className="nav-link" onClick={signOutHandler}>
              SAIR
            </Link>
          ) : (
            <Link className="nav-link" to="/auth">
              ENTRAR
            </Link>
          )}
          <CartIcon />
        </div>
        { isCartOpen && <DropDown /> }
        
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
