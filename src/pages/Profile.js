import { useNavigate } from 'react-router-dom';

const PUB = process.env.PUBLIC_URL + '/img/';

function Profile({ orders }) {
  const navigate = useNavigate();

  return (
    <div className="content">
      <div className="pageTitle">
        <button className="backButton" onClick={() => navigate('/')}>
          <img src={PUB + 'Vector.svg'} alt="Назад" />
        </button>
        <h1>Мои покупки</h1>
      </div>

      {orders.length === 0 ? (
        <div className="favEmpty">
          <img src={PUB + 'noorder.svg'} alt="Нет заказов" width={80} height={80} />
          <h2>Покупок нет</h2>
          <p>Оформите хотя бы один заказ, чтобы он появился здесь.</p>
        </div>
      ) : (
        <div className="orders">
          {orders.map((order) => (
            <div key={order.id} className="orderBlock">
              <div className="orderHeader">
                <div>
                  <h3>Заказ #{order.id}</h3>
                </div>
              </div>
              <div className="page d-flex flex-wrap">
                {order.items.map((item, index) => (
                  <div key={index} className="card">
                    <img width={133} height={112} src={item.imgUrl} alt={item.title} />
                    <p>{item.title}</p>
                    <div className="cardBottom">
                      <div className="price">
                        <span>Цена</span>
                        <b>{item.price} р.</b>
                      </div>
                      <div className="orderComplete">
                        <img src={PUB + 'select.svg'} alt="Заказано" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;