import Cookies from 'js-cookie'
import { DeleteMyDataFromIDB } from './IndexedDB';
export const TOKEN_KEY = "TCC_APIToken"
export const NAME_KEY = "@tcc_api-Name"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  return token
};

export const login = token => {
  Cookies.set(TOKEN_KEY, token);
};

export const logout = () => {
  Cookies.remove(TOKEN_KEY)
  DeleteMyDataFromIDB()
};