import  {AUTH_LOGIN_REQUEST,AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAILURE} from '../constants/authType';

export const authLoginRequest = (payload) => {
    return {
        type: AUTH_LOGIN_REQUEST,
        payload: payload
    }
}

export const authLoginSuccess = (payload) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: payload
    }
}

export const authLoginFailure = (payload) => {
    return {
        type: AUTH_LOGIN_FAILURE,
        payload: payload
    }
}

export const authLogoutSuccess = (payload) => {
    return {
        type: AUTH_LOGOUT_SUCCESS,
        payload: payload
    }
}

export const authLogoutFailure = (payload) => {
    return {
        type: AUTH_LOGOUT_FAILURE,
        payload: payload
    }
}