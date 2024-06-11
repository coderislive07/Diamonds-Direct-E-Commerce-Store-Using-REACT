export const ADD=(item)=>{
    return {
        type:"ADD_CART",
        payload:item
    }   
}
export const DLT=(id)=>{
    return {
        type:"RMV_CART",
        payload:id
    }
}
export const updateCartItems = (cartItems) => {
    return {
      type: 'UPDATE_CART_ITEMS',
      payload: cartItems,
    };
}
export const updateQuantities = (quantities) => {
    return {
      type: 'UPDATE_QUANTITIES',
      payload: quantities,
    };
};

