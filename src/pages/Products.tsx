import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/components/interfaces/Product';
import { useAuth } from '@/components/auth/AuthContext';
import { CheckIcon } from 'lucide-react';

export function Products() {
    const navigate = useNavigate();
    const { user, addToCart } = useAuth();
    const [search, setSearch] = useState<string>("");
    const [products, setProducts] = useState<Array<Product>>(new Array<Product>());
    const [selectedProduct, setSelectedProduct] = useState<Map<Number, Product>>(user?.cartItems || new Map());

    function addProductToCart(product: Product): void {
        (user) ? setSelectedProduct(new Map<Number, Product>(addToCart(product)) || new Map()) : navigate("/login");
    }

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => alert(error));
    }, []);

    return (
        <div className="flex flex-col gap-2 min-w-[50vw] pl-6 pr-6">
            <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ScrollArea className={"max-h-[85vh]"}>
                {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(product => (
                    <Card key={`${product.id} - ${new Date()}`}>
                        <CardHeader>
                            <CardTitle className="text-2xl">{product.name}</CardTitle>
                            <CardDescription>
                                {product.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <Label>${product.price}</Label>
                                <Button variant={"secondary"} onClick={() => addProductToCart(product)}>{selectedProduct.has(product.id) ? <CheckIcon /> : "Add to Cart"}</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </ScrollArea>
        </div>
    );
}