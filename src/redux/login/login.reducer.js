import loginConstant  from './login.constant';

const initState = {
    user: null,
    profile: null,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
      case loginConstant.LOGIN_REQUEST:
           return { ...state, loginLoading: true };
      case loginConstant.LOGIN_RECEIVED:
           return { ...state, user: action.json, loginError:action.errors, loginLoading: false }
      case loginConstant.REGISTER_REQUEST:
           return { ...state, registerLoading: true };
      case loginConstant.REGISTER_RECEIVED:
           return { ...state, user: action.json, registerError:action.errors, registerLoading: false }
      case loginConstant.RESTORE_ONLOAD:
          return { ...state, user: action.params }
     case loginConstant.SETTINGS_REQUEST:
          return { ...state, settingsLoading: true }
     case loginConstant.SETTINGS_UPDATE_REQUEST:
          return { ...state, settingsLoading: true }
     case loginConstant.SETTINGS_RECEIVED:
          return { ...state, user:action.json, settingError:action.errors, settingsLoading: false }
     case loginConstant.LOGOUT_RECEIVED:
          return { ...state, user:null }
     case loginConstant.PROFILE_RECEIVED:
          return { ...state, profile:action.json, profileError: action.errors }
     case loginConstant.USER_RECEIVED:
          return { ...state, user:action.json, userError: action.errors }
      default: 
           return state;
    }
   };

   export default reducer;