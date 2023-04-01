import { Routes, Route } from 'react-router-dom';
import Home from './router/home/home.component';


const App = () => {
  const Shop = () => {
    return (<h1>Shop</h1>)
  }
  return (
    <Routes>
      <Route path='/home' element={<Home />} >
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;