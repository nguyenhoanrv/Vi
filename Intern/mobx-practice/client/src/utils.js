export const setUserToStorage = (username) => {
  localStorage.setItem('user', username)
}

export const getUserStorage = () => {
  return localStorage.getItem('user')
}
