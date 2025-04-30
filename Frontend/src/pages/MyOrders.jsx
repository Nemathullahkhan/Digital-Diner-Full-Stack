import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { Loader } from "../utils/Loader";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || !user.id) {
      setLoading(false);
      return;
    }

    const getOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/order/get`,
          {
            userId: user.id,
          }
        );
        console.log("Response data:", response.data);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [user]);

  if (!user || !user.id) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold ">Welcome {user.name}, </h1>
        <p className="text-xl mx-2 tracking-tight">Here are your orders</p>
      </div>

      {loading ? (
        <div className="h-[68vh] align-middle ">
          <div className="flex justify-center py-32">
            <Loader />
          </div>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {order.name || `Order #${order.id}`}
                </h2>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status || "Unknown"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-medium">Order ID:</span> {order.id}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Total:</span>{" "}
                    {order.total ? `$${order.total.toFixed(2)}` : "N/A"}
                  </p>
                </div>
                <div>
                  {order.items && order.items.length > 0 ? (
                    <div>
                      <p className="font-medium text-gray-700">Items:</p>
                      <ul className="list-disc pl-5 text-gray-600">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.name || "Item"} x {item.quantity || 1}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-600">No items listed.</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <button className="text-blue-600 hover:underline text-sm">
                  View Order Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}
    </div>
  );
};
