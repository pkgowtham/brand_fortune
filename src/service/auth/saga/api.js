import {axio} from '../../../axios'

export const loginUserApi = (data) => {
    return (
        axio.post('/auth/login',{...data})
    )
}

