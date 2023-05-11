import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.componet";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';
const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)
    return (
        <Fragment >
            <div className='navigation'>
                <Link className="logo-container" to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className="nav-links-container">
                    <Link className='nav-link' to='/shop'>
                        CỬA HÀNG
                    </Link>
                    {!currentUser ?
                        <Link className='nav-link' to='/auth'>
                            ĐĂNG NHẬP
                        </Link>
                        : <span onClick={signOutUser}
                            className='nav-link'>ĐĂNG XUẤT</span>}
                    <CartIcon />
                </div>

                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation