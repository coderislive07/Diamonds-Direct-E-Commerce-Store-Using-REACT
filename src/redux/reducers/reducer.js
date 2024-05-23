import { getLocalCartData } from "../../components/cart";
import { removeCartData } from "../../components/cart";

const INIT_STATE = {
    carts: getLocalCartData()
};

export const Cartreducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                ...state,
                carts: [...state.carts, action.payload]
            };
        case "RMV_CART":
            return {
                ...state,
                carts: state.carts.filter((item) => item.id !== action.payload)
            };
        case "UPDATE_QUANTITY":
            const { index, quantity } = action.payload;
            const updatedCarts = [...state.carts];
            updatedCarts[index].quantity = quantity;
            return {
                ...state,
                carts: updatedCarts
            };
        default:
            return state;
    }
};
