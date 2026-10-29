import { api } from "./api";

export const orderRepository = {
    create(cartItems, totalInCents, paymentMethod){
        const items = cartItems.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity, 
            note: item.note || '',

        }))

        return api('/orders' , {
            method: `POST`, 
            body: JSON.stringify({
                items, 
                totalInCents, 
                paymentMethod, 
                createdAt: new Date().toISOString,
            })
        })
    }
}