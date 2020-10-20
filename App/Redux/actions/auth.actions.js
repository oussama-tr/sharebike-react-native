/*import userLogin from '../services/api/authService';

export function login(payload) {
  return dispatch => {
    return userLogin(payload)
      .then(res => {
        const token = res.data.token;
  			console.log(token);
        localStorage.setItem('jwtToken', token);
  		})
  		.catch((err) => {
  			console.log(err);
  		});
  }
}*/


// Actions
export const setAuthPending = () => {
	return {
		type: 'SET_AUTH_PENDING'
	};
};
export const setLoginSuccess = (authToken, refreshToken) => {
	return {
		type: 'SET_LOGIN_SUCCESS',
		authToken,
		refreshToken
	};
};
export const setLoginError = loginError => {
	return {
		type: 'SET_LOGIN_ERROR',
		loginError
	};
};

export const setLogout = () => {
	return {
		type: 'SET_LOGOUT'
	};
};
export const saveAppToken = authToken => {
	return {
		type: 'SAVE_APP_TOKEN',
		authToken
	};
};
