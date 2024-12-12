import { NavLink } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <NavLink to="/products">Products</NavLink>
                {user && <NavLink to="/cart">Cart</NavLink>}
                {user && <NavLink to="/profile">Profile</NavLink>}
            </div>
            <div className="navbar-auth">
                {user ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </div>
        </nav>
    );
}