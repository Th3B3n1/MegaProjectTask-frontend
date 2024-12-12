import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/components/interfaces/Product';

export function Products() {
    const [search, setSearch] = useState<string>("");
    const [products, setProducts] = useState<Array<Product>>([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="flex flex-col gap-2 min-w-[50vw]">
            <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ScrollArea className={"max-h-[85vh]"}>
                {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(product => (
                    <Card key={product.id}>
                        <CardHeader>
                            <CardTitle className="text-2xl">{product.name}</CardTitle>
                            <CardDescription>
                                {product.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <Label>${product.price}</Label>
                                <Button variant={"secondary"}>Add to Cart</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </ScrollArea>
        </div>
    );
}