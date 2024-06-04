import Logo from "../assets/logo.png"
import './Header.css'

const Header = () => {
    return (
        <header id="header">
            <img src={Logo} alt="Aurum-Play-Tracker" />
            <h1>Aurum - Play Tracker</h1>
        </header>
    )
}
export default Header;

