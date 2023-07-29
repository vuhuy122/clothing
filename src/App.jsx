/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect } from 'react';


import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Authentication from './router/authentication/authentication.component';
import Checkout from './router/checkout/checkout.component';
import Home from './router/home/home.component';
import Navigation from './router/navigation/navigation.component';
import Shop from './router/shop/shop.component';
import { checkUserSession } from './store/user/user.action';
// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});


const App = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   // Thực hiện đăng nhập bằng Google khi component được tạo
  //   const authWindow = window.open('/login', '_blank');
  //   authWindow.focus();
  // }, []);

// // server.js (ví dụ sử dụng Express)
// const express = require('express');
// const app = express();

// // Xử lý yêu cầu đăng nhập
// app.get('/login', (req, res) => {
//   // Thực hiện đăng nhập Firebase ở đây
//   // Ví dụ:
//   // const result = await firebase.auth().signInWithPopup(googleProvider);
//   // Sau khi đăng nhập thành công, đóng cửa sổ đăng nhập và trả kết quả về phía client
//   res.send('<script>window.close()</script>');
// });

// app.listen(3000, () => {
//   console.log('Server started on http://localhost:3000');
// });

  useEffect(() => {
    dispatch(checkUserSession())
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