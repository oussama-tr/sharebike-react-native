import axios from 'axios/index';
import { Config } from '../../Config/api';

const paymentApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})


export function addCard(payload, jwt){
  let config = {
  headers: {
    auth: jwt,
  }
  }
  return paymentApiClient.post('/user/mobile/addCard', payload, config);
}

export function removeCard(payload, jwt){
  let config = {
  headers: {
    auth: jwt,
  }
  }
  return paymentApiClient.post('/user/mobile/removeCard', payload, config);
}

export function getCards(jwt){
  let config = {
  headers: {
    auth: jwt,
  }
  }
  return paymentApiClient.get('/user/mobile/getCards', config);
}

export function getCustomer(jwt){
  let config = {
  headers: {
    auth: jwt,
  }
  }
  return paymentApiClient.get('/user/mobile/getCustomer', config);
}
