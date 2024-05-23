// actions.js
export const ADD = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    };
};
export const DLT = (id) => {
    return {
        type: "RMV_CART",
        payload: id
    };
};

export const UPDATE_QUANTITY = (index, quantity) => {
    return {
        type: "UPDATE_QUANTITY",
        payload: { index, quantity }
    };
};
