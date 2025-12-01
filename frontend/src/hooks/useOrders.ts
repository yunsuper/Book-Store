import { useEffect, useState } from "react";
import type { OrderListItem } from "../models/order.model";
import { fetchOrders, fetchOrder } from "../api/order.api";

export const useOrders =()=>{
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(()=>{
        fetchOrders().then((orders)=>{
            setOrders(orders);
        })
    }, []);

    const selectOrderItem = (orderId: number) => {
        if (orders.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId);
            return;
        }

        fetchOrder(orderId).then((orderDetail) => {
            setSelectedItemId(orderId);

            setOrders(
                orders.map((item) =>
                    item.id === orderId
                        ? { ...item, detail: orderDetail } // detail: OrderDetailItem[]
                        : item
                )
            );
        });
    };

    return { orders, selectedItemId, selectOrderItem };
}