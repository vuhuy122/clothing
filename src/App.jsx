import { Route, Routes } from 'react-router-dom';
import Authentication from './router/authentication/authentication.component';
import Navigation from './router/navigation/navigation.component';
import Home from './router/home/home.component';
import Shop from './router/shop/shop.component';
import Checkout from './router/checkout/checkout.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;