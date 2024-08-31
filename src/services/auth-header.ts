export default function authHeader() {
  const userStr = localStorage.getItem('user')
  let user = null
  if (userStr) user = JSON.parse(userStr)

  if (user && user.profileToken) {
    return { Authorization: 'Bearer ' + user.profileToken } // for Spring Boot back-end
  } else {
    return { Authorization: '' } // for Spring Boot back-end
  }
}
