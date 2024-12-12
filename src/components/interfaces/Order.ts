import { Product } from './Product';

export interface Order {
    id: number;
    date: Date;
    status: string;
    products: Product[];
}