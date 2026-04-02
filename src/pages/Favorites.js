import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
 
function Favorites({ favorites, onFavorite, onPlus, cartItems }) {
    const navigate = useNavigate();
  return (
    <div className="content">
      <div className="content2 d-flex">
         <div className="pageTitle">
          <button className="backButton" onClick={() => navigate('/')}>
            <img width={8} height={8} src="/img/Vector.svg" alt="Назад"/>
          </button>
        <h1>Мои закладки</h1>
      </div>
        </div>
 
      {favorites.length === 0 ? (
        <div className="favEmpty">
          <img src="/img/nofavs.png" alt="Нет закладок" width={80} height={80} />
          <h2>Закладок нет :( </h2>
          <p>Вы ничего не добавляли в закладки</p>
        </div>
      ) : (
        <div className="page d-flex flex-wrap">
          {favorites.map((item) => (
            <Card
              key={item.id}
              id={item.parentId}
              title={item.title}
              price={item.price}
              imgUrl={item.imgUrl}
              onFavorite={onFavorite}
              onPlus={onPlus}
              isFavorite={true}
              added={cartItems.some((obj) => obj.parentId === item.parentId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
 
export default Favorites;