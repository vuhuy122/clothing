import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.componet";
import { SelectCartIsOpen } from "../../store/cart/cart.selector";
import { selectorCurrentUser } from "../../store/user/user.selector";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinkContainer,
} from "./navigation.styles.jsx";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const currentUser = useSelector(selectorCurrentUser);
  const isCartOpen = useSelector(SelectCartIsOpen);
  const dispatch = useDispatch();
  const handleSignOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinkContainer>
          <NavLink to="/shop">CATEGORY</NavLink>
          {!currentUser ? (
            <NavLink to="/auth">LOGIN</NavLink>
          ) : (
            <NavLink as="span" onClick={handleSignOutUser}>
              LOGOUT
            </NavLink>
          )}
          <CartIcon />
        </NavLinkContainer>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
