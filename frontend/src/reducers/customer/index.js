const customer = JSON.parse(localStorage.getItem("customer"));
const token = JSON.parse(localStorage.getItem("token"));
const initialState = {
    customer: customer ? customer : {},
    token: token ? token :undefined,
};


const customerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "ADD_CUSTOMER":
          
            localStorage.setItem("customer", JSON.stringify(payload));
            console.log(payload);
            return {
                customer: payload,
                token:state.token
            }
            case "ADD_TOKEN":
             
                localStorage.setItem("token", JSON.stringify(payload));
                console.log(payload);
                return {
                    customer: state.customer,
                    token:payload
                }
    
        case "REMOVE_CUSTOMER":
            localStorage.removeItem("customer");
            return {
                customer: {},
                token:undefined
            }

         
        default:
            return state;
    }
}

export default customerReducer;