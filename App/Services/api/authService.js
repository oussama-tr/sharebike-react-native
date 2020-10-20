import axios from 'axios/index';
import { Config } from '../../Config/api';

const authApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/*authApiClient.interceptors.request.use(config => {
  // perform a task before the request is sent
  console.log('Request was sent');
  return config;
}, error => {
  // handle the error
  return Promise.reject(error);
});*/

export function googleOauth(payload){
  return authApiClient.post('/user/mobile/oauth/google', payload);
}

export function googleSignup(payload){
  return authApiClient.post('/user/mobile/signup/google', payload);
}

export function facebookOauth(payload){
  return authApiClient.post('/user/mobile/oauth/facebook', payload)
}

export function getFacebookProfile(accessToken){
   return authApiClient.post('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
}

export function facebookSignup(payload){
  return authApiClient.post('/user/mobile/signup/facebook', payload);
}

export function localSignup(payload){
  return authApiClient.post('/user/mobile/signup/local', payload);
}

export function userLogin(payload){
  return authApiClient.post('/user/mobile/signin', payload);
}

export function sendOtp(payload){
  return authApiClient.post('/user/mobile/sendsms', payload);
}
