import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import React from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened]=React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    axios.get('https://69ca7da1ba5984c44bf3477b.mockapi.io/items')
  .then((res) => {
    setItems(res.data);
  });
  axios.get('https://69ca7da1ba5984c44bf3477b.mockapi.io/cart')
  .then((res) => {
    setCartItems(res.data);
  });
  axios.get('https://69cae5f4ba5984c44bf3f7d1.mockapi.io/favs').then((res) => {
      setFavorites(res.data);
    });
  axios.get('https://69cae5f4ba5984c44bf3f7d1.mockapi.io/orders').then((res) => {
      setOrders(res.data);
    });
},[]);

 const onAddToCart = (obj) => {
  const findItem = cartItems.find((item) => item.parentId === obj.parentId);
  if (findItem) {
    axios.delete(`https://69ca7da1ba5984c44bf3477b.mockapi.io/cart/${findItem.id}`);
    setCartItems((prev) => prev.filter((item) => item.parentId !== obj.parentId));
  } else {
    axios.post('https://69ca7da1ba5984c44bf3477b.mockapi.io/cart', obj)
      .then((res) => {
        setCartItems((prev) => [...prev, res.data]);
      });
  }
};

const onRemoveItem = (id) => {
  axios.delete(`https://69ca7da1ba5984c44bf3477b.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter((item) => item.id !== id));
};

const onAddFav = (obj) => {
    const findItem = favorites.find((fav) => fav.parentId === obj.parentId);
    if (findItem) {
      axios.delete(`https://69cae5f4ba5984c44bf3f7d1.mockapi.io/favs/${findItem.id}`);
      setFavorites((prev) => prev.filter((fav) => fav.parentId !== obj.parentId));
    } else {
      axios.post('https://69cae5f4ba5984c44bf3f7d1.mockapi.io/favs', obj).then((res) => {
        setFavorites((prev) => [...prev, res.data]);
      });
    }
  };
  const onOrder = () => {
    const order = {
      items: cartItems,
      totalPrice: cartItems.reduce((sum, obj) => sum + obj.price, 0),
    };
 
    // сохраняем заказ на сервер
    axios.post('https://69cae5f4ba5984c44bf3f7d1.mockapi.io/orders', order).then((res) => {
      setOrders((prev) => [...prev, res.data]);
    });
    cartItems.forEach((item) => {
      axios.delete(`https://69ca7da1ba5984c44bf3477b.mockapi.io/cart/${item.id}`);
    });
    setCartItems([]);
  };

const onSearchInput=(event)=>{
  setSearchValue(event.target.value);
}
  return <div className='wrapped'>
  {cartOpened ? <Drawer 
  items={cartItems} 
  onClose ={() => setCartOpened(false)} 
  onRemove={onRemoveItem} 
  onOrder={onOrder}
  /> 
  : null}
<Header onClickCart ={() => setCartOpened(true)} />
<Routes>
        {/* Главная страница */}
        <Route
          path="/"
          element={
<div className='content'>
<div className="content2 d-flex">
<h1>{searchValue ? `Поиск по запросу: "${searchValue}"`: 'Все кроссовки'}</h1>
<div className="search-block">
<img src="/img/search.svg" alt="Search"/>
{searchValue && <img onClick={() => setSearchValue('')} className='removeSearch' src="/img/btn-remove.svg" alt="Remove"/>}
<input onChange={onSearchInput} value={searchValue} placeholder="Поиск..."/>
</div>
</div>
<div className="page d-flex flex-wrap">
  {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) =>( 
    <Card
    key={item.id}
    id={item.id}
    title={item.title}
    price={item.price}
    imgUrl={item.imgUrl}
    onFavorite={(obj) => onAddFav(obj)}
    onPlus={(obj) => onAddToCart(obj)}
    added={cartItems.some((obj) => obj.parentId === item.id)}
    isFavorite={favorites.some((obj) => obj.parentId === item.id)}
    />
  ))
 }
  
</div>

</div>
 }
        />
        {/* Страница закладок */}
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onFavorite={onAddFav}
              onPlus={onAddToCart}
              cartItems={cartItems}
            />
          }
        />
         <Route
          path="/profile"
          element={<Profile orders={orders} />}
        />
      </Routes>
  </div>
  


    
}

export default App;
