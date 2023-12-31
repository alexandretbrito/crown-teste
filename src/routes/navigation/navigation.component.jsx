import { useContext } from "react";
import { userSignOut  } from "../../utils/firebase/firebase.utils";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crown } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import DropDown from "../../components/dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user-context.component";
import { CartContext } from "../../contexts/cart-context.component";
import { NavigationContainer, LogoContainer, NavLinkContainer, NavLink} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  
  const signOutHandler = async () => {
    await userSignOut();
  }

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <Crown />
        </LogoContainer>
        <NavLinkContainer>
          <NavLink to="/shop">
            LOJA
          </NavLink>
          {currentUser ? (
            <NavLink onClick={signOutHandler}>
              SAIR
            </NavLink>
          ) : (
            <NavLink to="/auth">
              ENTRAR
            </NavLink>
          )}
          <CartIcon />
        </NavLinkContainer>
        { isCartOpen && <DropDown /> }
        
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
