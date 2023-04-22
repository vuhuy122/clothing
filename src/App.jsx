import { Route, Routes } from 'react-router-dom';
import SignIn from './router/sign-in/sign-in.component';
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
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;