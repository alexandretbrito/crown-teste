import { userSignOut  } from "../../utils/firebase/firebase.utils";
import { Outlet } from "react-router-dom";
import { ReactComponent as Crown } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import DropDown from "../../components/dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { NavigationContainer, LogoContainer, NavLinkContainer, NavLink} from "./navigation.styles";

const Navigation = () => {
  const isCartOpen  = useSelector(selectIsCartOpen);
  const currentUser = useSelector(userSelector)
  
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
