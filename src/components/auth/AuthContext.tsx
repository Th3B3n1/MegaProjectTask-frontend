import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../interfaces/User';
import { Product } from '../interfaces/Product';

interface AuthContextType {
    user?: User;
    login: (user: User) => void;
    logout: () => void;
    autoLogin: () => void;
    addToCart: (product: Product) => Map<Number, Product> | undefined;
    removeFromCart: (product: Product) => Map<Number, Product> | undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    function login(user: User) {
        setUser(user);
        localStorage.setItem('user', user.token);
    };

    function autoLogin() {
        const token = localStorage.getItem('user');
        if (token) {
            
        }
    }

    function logout() {
        setUser(undefined);
        localStorage.clear();
    };

    function addToCart(product: Product): Map<Number, Product> | undefined {
        (user) ? (user.cartItems.set(product.id, product)) : alert('Please login to add items to cart');
        return user?.cartItems;
    }
    
    function removeFromCart(product: Product): Map<Number, Product> | undefined {
        user?.cartItems.delete(product.id);
        return user?.cartItems;
    }

    return (
        <AuthContext.Provider value={{ user, autoLogin, login, logout, addToCart, removeFromCart }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};