import Cookies from 'js-cookie'
export const TOKEN_KEY = "TCC_APIToken"
export const NAME_KEY = "@tcc_api-Name"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  return token
  // localStorage.getItem(TOKEN_KEY);
}

export const getServerSideCookies = (ctx) => {
  const { TCC_APIToken } = ctx.req.cookies
  return TCC_APIToken
}

export const login = token => {
  return Cookies.set(TOKEN_KEY, token);
  // localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  return Cookies.delete(TOKEN_KEY)
  // localStorage.removeItem(TOKEN_KEY);
};