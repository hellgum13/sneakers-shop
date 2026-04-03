import React from 'react';

function Card({ id, title, imgUrl, price, onFavorite, onPlus, added = false, isFavorite = false }) {
  const [isLiked, setIsLiked] = React.useState(isFavorite);

  React.useEffect(() => {
    setIsLiked(isFavorite);
  }, [isFavorite]);

  const onClickPlus = () => { onPlus({ parentId: id, title, imgUrl, price }); };
  const onClickFav = () => {
    setIsLiked(!isLiked);
    onFavorite({ parentId: id, title, imgUrl, price });
  };

  return (
    <div className="card">
      <div className="favorite" onClick={onClickFav}>
        <img src={isLiked ? process.env.PUBLIC_URL + '/img/liked.svg' : process.env.PUBLIC_URL + '/img/unliked.svg'} alt="Favorite" />
      </div>
      <img width={133} height={112} src={imgUrl} />
      <p>{title}</p>
      <div className="cardBottom">
        <div className="price">
          <span>Цена</span>
          <b>{price} р.</b>
        </div>
        <button onClick={onClickPlus}>
          <img src={added ? process.env.PUBLIC_URL + '/img/select.svg' : process.env.PUBLIC_URL + '/img/plus.svg'} />
        </button>
      </div>
    </div>
  );
}

export default Card;