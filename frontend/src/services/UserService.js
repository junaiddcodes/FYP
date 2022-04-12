import GenericService from './GenericService'
import jwtDecode from 'jwt-decode'
class UserService extends GenericService {
  constructor() {
    super()
  }

  login = (email, password, role) =>
    new Promise((resolve, reject) => {
      this.post(`${role}/login`, { email, password })
        .then((token) => {
          localStorage.setItem('token', token)
          resolve(token)
        })
        .catch((err) => {
          reject(err)
        })
    })
  register_user = (customerDetails) =>
    this.post('customer/register', customerDetails)
  logout = () => {
    localStorage.removeItem('token')
  }

  waterIntake = (water_intake) => {
    this.post('waterIntake/addWaterIntake', water_intake)
  }
  waterPage = (waterId) => {
    this.get('waterIntake/:waterId', waterId)
  }
  isLoggedIn = () => {
    return localStorage.getItem('token') ? true : false
  }
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem('token')
      return jwtDecode(jwt)
    } catch (ex) {
      return null
    }
  }
  getoneUser = (user_id) => this.get('customer/' + user_id)

  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == 'admin') return true
      else return false
    } else return false
  }
}

let userService = new UserService()
export default userService
