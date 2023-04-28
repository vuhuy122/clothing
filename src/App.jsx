import { Route, Routes } from 'react-router-dom';
import Authentication from './router/authentication/authentication.component';
import Navigation from './router/navigation/navigation.component';
import Home from './router/home/home.component';

const App = () => {
  const Shop = () => {
    return (<h1>Shop</h1>)
  }
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;