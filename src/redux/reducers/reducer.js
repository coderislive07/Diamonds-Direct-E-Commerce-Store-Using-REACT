const INIT_STATE = {
    carts:[]
}

export const Cartreducer=(state=INIT_STATE,action)=>{
    switch(action.type)
    {
        case "ADD_CART":
            return{
                ...state,
                carts:[...state.carts,action.payload]
            }
            default:
                return state
    }
 
}

