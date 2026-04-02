import { Link } from 'react-router-dom';

function Header({ onClickCart }) {
  return (
    <header>
      <div className="headerleft">
        <Link to="/">
          <img width={40} height={40} src="/img/logo1.png" alt="Logo" />
        </Link>
        <div className="headerinfo">
          <h3>React Sneakers</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="headerright">
        <li onClick={onClickCart}>
          <img width={18} height={18} src="/img/Group.svg" alt="Cart" />
          <span>1205 руб.</span>
        </li>
        <Link to="/favorites">
          <li>
            <img width={18} height={18} src="/img/fav.svg" alt="Favorites" />
            <span>Закладки</span>
          </li>
        </Link>
        <Link to="/profile">
          <li>
            <img width={18} height={18} src="/img/Union.svg" alt="Profile" />
            <span>Профиль</span>
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;