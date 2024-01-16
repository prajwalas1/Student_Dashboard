import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Header.css";

const Header = () => {
  return (
    <div className='header'> 
      <Link to={"./"}>
        <img src='https://www.alemeno.com/static/assets/images/logo.png' alt='logo'/>
        </Link>
        <Link to={"./dashboard"} className='dashboard-button'>
            Dashboard
        </Link>
    </div>
  )
}

export default Header;