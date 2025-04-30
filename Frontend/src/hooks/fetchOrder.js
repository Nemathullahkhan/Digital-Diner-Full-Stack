import axios from "axios";

export const fetchOrder = async (userId) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/order/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch order data");
        }
        const data = await response.data;
        return data; // Should return an array of orders
    }catch(err){
        console.error("Error fetching order:", err);
        throw new Error("Failed to fetch order data");
    }
}