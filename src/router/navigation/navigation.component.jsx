import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.componet";
import { CartContext } from "../../contexts/cart.context";
import { selectorCurrentUser } from "../../store/user/user.selector";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { LogoContainer, NavigationContainer, NavLink, NavLinkContainer } from './navigation.styles.jsx';


const Navigation = () => {
    const currentUser = useSelector(selectorCurrentUser)
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment >
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinkContainer>
                    <NavLink to='/shop'>
                        CỬA HÀNG
                    </NavLink>
                    {!currentUser ?
                        <NavLink to='/auth'>
                            ĐĂNG NHẬP
                        </NavLink>
                        :
                        <NavLink as='span' onClick={signOutUser}>
                            ĐĂNG XUẤT
                        </NavLink>}
                    <CartIcon />
                </NavLinkContainer>

                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}
export default Navigation