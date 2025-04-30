import React from "react";
import { useLocation } from "react-router-dom";

export const OrderConfirmation = () => {
  const location = useLocation();
  const { order, message } = location.state || {};

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate order details
  const calculateOrderDetails = (items) => {
    if (!items || !Array.isArray(items)) {
      return { subtotal: 0, totalItems: 0 };
    }
    const subtotal = items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    );
    const totalItems = items.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    return { subtotal, totalItems };
  };

  // Hypothetical tax and delivery fee
  const { subtotal, totalItems } = calculateOrderDetails(order?.items);
  const taxRate = 0.05; // 5% tax
  const taxes = subtotal * taxRate;
  const deliveryFee = 50; // Fixed ₹50 delivery fee
  const calculatedTotal = subtotal + taxes + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl w-full bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {order ? (
          <>
            {/* Order Header */}
            <div className="border-b border-gray-200 pb-2 ">
              {message && (
                <h2 className="text-2xl font-bold text-green-600 ">
                  {message}
                </h2>
              )}
              <div className="text-md mx-1">
                <p className="text-gray-900 font-semibold">
                  Order #{order.id || "N/A"}
                </p>
                <p className="text-gray-600">
                  Ordered Date: {formatDate(order.createdAt)}
                </p>
                <p className="text-gray-600">Total Items: {totalItems}</p>
              </div>
            </div>

            {/* Items List */}
              <h3 className="text-md  font-semibold text-gray-900 ">
                Items List
              </h3>
              {order.items && order.items.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full  divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-md object-cover mr-4"
                                />
                              )}
                              <span className="text-sm text-gray-900 font-medium">
                                {item.name || "Unknown Item"}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            ₹{(item.price || 0).toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {item.quantity || 0}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            ₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No items in this order.</p>
              )}

            {/* Amount Breakdown */}
            <div className="border-t border-gray-200 ">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes (5%)</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>
                    ₹{typeof order.total === "number"
                      ? order.total.toFixed(2)
                      : calculatedTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-center text-sm sm:text-base">
            No order details available.
          </p>
        )}
      </div>
    </div>
  );
};