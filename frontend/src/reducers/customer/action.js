export const addCustomer = (customer) => {
    return {
        type: "ADD_CUSTOMER",
        payload: customer
    }
}

export const addToken = (token) => {
    return {
        type: "ADD_TOKEN",
        payload: token
    }
}


export const removeCustomer = () => {
    return { type: "REMOVE_CUSTOMER",
 }
}



