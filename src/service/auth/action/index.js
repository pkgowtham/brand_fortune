import { ACTION_TYPE } from "../../../constant/actionType";

export const loginUser = (data)=>({
    type:ACTION_TYPE.LOGIN_USER_SAGA,
    payload:{
        data:data,
    }
})

// export const createUser = (userData)=>({
//     type:ACTION_TYPE.CREATE_USER_SAGA,
//     payload:{
//         userData:userData,
//     }
// })

// export const getUser = (token)=>({
//     type:ACTION_TYPE.GET_USER_SAGA,
//     payload:{
//         token:token,
//     }
// })

// export const updatedUser = (updatedData)=>({
//     type:ACTION_TYPE.UPDATED_USER_SAGA,
//     payload:{
//         updatedData:updatedData,
//     }
// })

// export const deleteUser = ()=>({
//     type:ACTION_TYPE.UPDATED_USER_SAGA,    
// })

export const initialStateLogin = ()=>({
    type:ACTION_TYPE.LOGIN_RETURN_INITIAL_STATE,    
})

