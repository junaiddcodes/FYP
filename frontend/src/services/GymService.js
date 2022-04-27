import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class GymService extends GenericService {
  constructor() {
    super();
  }

  register_gym = (gymDetails) => this.post("gym/gymregister", gymDetails);
  update_gym = (gymDetails, id) => this.patch("gym/" + id, gymDetails);
  get_one_gym = (id) => this.get("gym/" + id);
  get_all_gyms = () => this.get("gym");

  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == "admin") return true;
      else return false;
    } else return false;
  };
}

let gymService = new GymService();
export default gymService;
