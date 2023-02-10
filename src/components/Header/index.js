import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

const Header = () => (
  <div className="header-container">
    <img
      className="book-hub-website-logo-image"
      src="https://res.cloudinary.com/di8upujpz/image/upload/v1674035023/Group_7732_lk7a9q.png"
    />
    <button className="hamburger-icon-button">
      <GiHamburgerMenu className="hamburder-icon" />
    </button>
    <div className="nav-container">
      <ul className="nav-items-container">
        <li className="nav-item-text">Home</li>
        <li className="nav-item-text">Bookshelves</li>
      </ul>
      <button className="logout-button">Logout</button>
    </div>
  </div>
)

export default Header
