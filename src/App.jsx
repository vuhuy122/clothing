import { createContext, useEffect } from 'react';


import { Route, Routes } from 'react-router-dom';
import Authentication from './router/authentication/authentication.component';
import Checkout from './router/checkout/checkout.component';
import Home from './router/home/home.component';
import Navigation from './router/navigation/navigation.component';
import Shop from './router/shop/shop.component';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.utils';
// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsub = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user));
    })
    return unsub
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;