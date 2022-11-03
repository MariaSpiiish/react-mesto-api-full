import logo from '../images/logo.svg';

function Header({redirect, buttonText, ownerEmail}) {

    return (
        <header className="header">
          <img className="header__logo" src={logo} alt="Логотип MestoRussia"/>
          <ul className="header__nav">
            <li>{ownerEmail && <p className="header__email">{ownerEmail}</p>}</li>
            <li><button onClick={redirect} className="header__link opacity">{buttonText}</button></li>
          </ul>
        </header>
    )
}

export default Header;