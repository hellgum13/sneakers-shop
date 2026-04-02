import React from 'react';
function Drawer({ onClose, onRemove, items =[], onOrder, orders =[]}){
  const [orderPlaced, setOrderPlaced] = React.useState(false);
   const totalPrice = items.reduce((sum, obj) => sum + obj.price, 0);
   const taxPrice = Math.round(totalPrice * 0.05);
    const handleOrder = () => {
    onOrder();
    setOrderPlaced(true);
  };
     return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Корзина
          <img onClick={onClose} src="/img/btn-remove.svg" alt="Remove" />
        </h2>
 
        {orderPlaced ? (
      
          
          <div className="cartEmpty">
            <img width={120} height={120} src="/img/order.svg" alt="Заказ оформлен" />
            <h2>Заказ оформлен!</h2>
            <p>Ваш заказ скоро будет передан курьерской доставке</p>
            
            <button onClick={onClose} className="greenButton">
              Вернуться назад
            </button>
          </div>
          
          
        ) : items.length === 0 ? (
          <div className="cartEmpty">
            <img width={120} height={120} src="/img/box.svg" alt="Корзина пустая" />
            <h2>Корзина пустая</h2>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={onClose} className="greenButton">
              Вернуться назад
            </button>
          </div>
        ) : (
          <>
            <div className="items">
              {items.map((obj, index) => (
                <div
                  key={obj.id}
                  className="cartItem"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <img width={70} height={70} src={obj.imgUrl} alt={obj.title} />
                  <div>
                    <p>{obj.title}</p>
                    <b>{obj.price} р.</b>
                  </div>
                  <div className="remove">
                    <img
                      onClick={() => onRemove(obj.id)}
                      src="/img/btn-remove.svg"
                      alt="Remove"
                    />
                  </div>
                </div>
              ))}
            </div>
 
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice.toLocaleString('ru-RU')} р.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{taxPrice.toLocaleString('ru-RU')} р.</b>
                </li>
              </ul>
              <button onClick={handleOrder} className="greenButton">Оформить заказ</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
 
export default Drawer;