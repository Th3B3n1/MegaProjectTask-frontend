import { useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/auth/AuthContext';
import { Product } from '@/components/interfaces/Product';

export function Cart() {
    const { user, removeFromCart } = useAuth();
    const [cartItems, setCartItems] = useState<Map<Number, Product>>(user?.cartItems || new Map());

    function removeCartItem(product: Product): void {   
        setCartItems(new Map<Number, Product>(removeFromCart(product)) || new Map());
    }

    return (
        <div className="grid grid-rows-[30vh_55vh] grid-cols-[80vw] gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-[60%_40%] gap-4">
                        <dl className="flex items-center justify-between gap-4 order-1">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">${[...cartItems.values()].reduce((acc, item) => acc + item.price, 0)}</dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4 order-3">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">${Math.floor(([...cartItems.values()].reduce((acc, item) => acc + item.price, 0)) * 0.27)}</dd>
                        </dl>
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700 order-5">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">${[...cartItems.values()].reduce((acc, item) => acc + item.price, 0) + Math.floor(([...cartItems.values()].reduce((acc, item) => acc + item.price, 0)) * 0.27)}</dd>
                        </dl>
                        <Button className='order-2' onClick={e => e.currentTarget}>Checkout</Button>
                        <Button className='order-4' variant="destructive" onClick={e => e.currentTarget}>Clear Cart</Button>
                    </div>
                </CardContent>
            </Card>
            <ScrollArea>
                <div className='grid gap-2'>
                    {[...cartItems.values()].map(item => (
                        <Card className="grid grid-cols-[60%_30%]" key={item.id}>
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>{item.name}</CardDescription>
                            </CardHeader>
                            <CardContent className='p-0 flex flex-row justify-end items-center'>
                                <div className="flex flex-row gap-6 items-center">
                                    <Label className='text-xl'>${item.price}</Label>
                                    <Button variant={"destructive"} className='justify-right' onClick={() => removeCartItem(item)}><Trash2Icon /></Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}