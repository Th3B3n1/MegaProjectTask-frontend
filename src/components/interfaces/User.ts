import { Order } from './Order'
import { Product } from './Product';

export interface User {
    name: string;
    email: string;
    token: string;
    cartItems: Map<Number, Product>;
    orders?: Order[];
}