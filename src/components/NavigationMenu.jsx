import "./NavigationMenu.css";

import { Link } from "react-router-dom";

function NavigationMenu() {
    return (
        <div className="navigation-menu">
            <nav className="main-nav">
                <div className="nav-brand">
                    <h2>Мое Приложение</h2>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/about">О нас</Link>
                    </li>
                    <li>
                        <Link to="/contact">Контакты</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavigationMenu;
