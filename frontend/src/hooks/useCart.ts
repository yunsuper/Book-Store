import { useEffect, useState } from "react";
import type { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isEmpty, setIsEmpty] = useState(true);

    const deleteCartItem = (cartId: number) => {
        deleteCart(cartId).then(() => {
            setCarts(carts.filter((cart) => cart.id !== cartId));
        });
    }

    useEffect(() => {
        fetchCart().then((carts) => {
            setCarts(carts);
            setIsEmpty(carts.length === 0);
        });
    }, []);

    return { carts, isEmpty, deleteCartItem };
}