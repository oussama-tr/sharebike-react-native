let initialState = {
	authPending: false,
	loggedIn: false,
	loginError: false,
	authToken: null,
	refreshToken: null,
	tokenIsValid: null,
	pendingRefreshingToken: null
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'SET_AUTH_PENDING':
		return {
			...state,
			authPending: true
		};
	case 'SET_LOGIN_SUCCESS':
		return {
			...state,
			authPending: false,
			loggedIn: true,
			loginError: false,
			authToken: action.authToken,
			refreshToken: action.refreshToken
		};
	case 'SET_LOGIN_ERROR':
		return {
			...state,
			authPending: false,
			loggedIn: false,
			loginError: action.loginError
		};

	case 'SET_LOGOUT':
		return {
			...state,
			authToken: false,
			refreshToken: false,
			loggedIn: false
		};
	case 'INVALID_TOKEN':
		return {
			...state,
			tokenIsValid: false
		};
	case 'REFRESHING_TOKEN':
		return {
			...state,
			pendingRefreshingToken: true,
			tokenIsValid: false
		};
	case 'TOKEN_REFRESHED':
		return {
			...state,
			pendingRefreshingToken: null,
			tokenIsValid: true
		};
	case 'SAVE_APP_TOKEN':
		return {
			...state,
			authToken: action.authToken
		};

	default:
		return state;
	}
}
