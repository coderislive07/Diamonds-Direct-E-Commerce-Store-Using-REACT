import { ToastContainer, toast } from 'react-toastify';

const notify = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}; 

const notifyagain = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}; 

const INIT_STATE = {
  carts: [],
  quantities: [],
}

export const Cartreducer = (state = INIT_STATE, action) => {
  switch(action.type) {
    case "ADD_CART":
      const existingItemIndex = state.carts.findIndex(item => item.key === action.payload.key);
      if(existingItemIndex !== -1) {
        notifyagain('Product is already added to cart');
        return {
          ...state,
        };
      } else {
        notify('Product Added to Cart');
        return {
          ...state,
          carts: [...state.carts, action.payload],
          quantities: [...state.quantities, 1],
        };
      }
    case "RMV_CART":
      const newCarts = state.carts.filter((item, index) => item.key !== action.payload);
      const newQuantities = state.quantities.filter((_, index) => state.carts[index].key !== action.payload);
      return {
        ...state,
        carts: newCarts,
        quantities: newQuantities,
      }
    case "UPDATE_CART_ITEMS":
      return {
        ...state,
        carts: action.payload,
      };
    case "UPDATE_QUANTITIES":
      return {
        ...state,
        quantities: action.payload,
      };
    default:
      return state;
  }
}
