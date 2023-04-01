import { Route, Routes } from 'react-router-dom';
import Home from './router/home/home.component';
import Navigation from './router/navigation/navigation.component';

const App = () => {


  const Shop = () => {
    return (<h1>Shop</h1>)
  }
  return (
    <Routes>
      <Route path='/' element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;