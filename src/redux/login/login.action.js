import loginConstant  from './login.constant';

export const login = (params,handler) => ({
    type: loginConstant.LOGIN_REQUEST,
    params,
    handler
});

export const register = (params,handler) => ({
    type: loginConstant.REGISTER_REQUEST,
    params,
    handler
});

export const restore = (params) => ({  type: loginConstant.RESTORE_ONLOAD, params });

export const getSettings = (params,handler) => ({
    type: loginConstant.SETTINGS_REQUEST,
    params,
    handler
})

export const setSettings = (params, handler) => ({
    type: loginConstant.SETTINGS_UPDATE_REQUEST,
    params,
    handler
});

export const logout = (params,handler) => ({
    type:loginConstant.LOGOUT_REQUEST,
    params,
    handler
})

export const profile = (params, handler) => ({
    type:loginConstant.PROFILE_REQUEST,
    params,
    handler
})

export const user = (params, handler) => ({
    type:loginConstant.USER_REQUEST,
    params,
    handler
})