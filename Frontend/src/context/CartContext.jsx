import { createContext, useContext, useEffect, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return [...state, {
        id: action.id,
        name: action.name,
        price: action.price,
        quantity: action.quantity,
        image: action.image 
      }];
    }
    case "REMOVE": {
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    }
    case "DROP": {
      let empArr = [];
      return empArr;
    }
    case "UPDATE": {
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            quantity: action.quantity,
            price: action.price
          };
        }
        return item;
      });
    }case "CLEAR": {
        let empArr = [];
        return empArr;
      }
    default:
      console.log("Error in reducer function");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], () => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing localStorage cart:", error);
      return [];
    }
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
      console.log("Saved cart to localStorage:", state);
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [state]);

  console.log("Cart state in provider:", state);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);