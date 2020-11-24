import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser)
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>

                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>

                {loggedInUser.email && <span style={{ margin: '20px', color: 'white' }}>
                    Welcome back {loggedInUser.name && loggedInUser.name.split(" ").slice(0, 1)}
                    {loggedInUser.displayName && loggedInUser.displayName.split(" ").slice(0, 1)}
                </span>}
            </nav>
        </div>
    );
};

export default Header;