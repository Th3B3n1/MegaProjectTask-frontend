import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2Icon, X } from 'lucide-react';
import { useState } from 'react';

export function Cart() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
    ]);

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <div className="grid grid-rows-[60vh] grid-cols-[50vw_20vw] gap-6">
            <ScrollArea className="max-h-[60vh]">
                <div className='grid gap-2'>
                    {cartItems.map(item => (
                        <Card className="grid grid-cols-[70%_30%]" key={item.id}>
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>{item.name}</CardDescription>
                            </CardHeader>
                            <CardContent className='p-0 flex flex-row justify-center items-center'>
                                <div className="flex flex-row gap-6 items-center">
                                    <Label className='text-xl'>${item.price}</Label>
                                    <Button variant={"destructive"} className='justify-right' onClick={() => removeItem(item.id)}><Trash2Icon /></Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
            <Card className='row-span-2 max-h-[40vh]'>
                <CardHeader>
                    <CardTitle>Total</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <Label>${cartItems.reduce((acc, item) => acc + item.price, 0)}</Label>
                        <Button className="clear-cart" onClick={clearCart}><X /></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}