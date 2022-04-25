import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class TrainerService extends GenericService {
  constructor() {
    super();
  }
  register_trainer = (trainerDetails) => this.post("trainer/trainerregister", trainerDetails);

  update_trainer = (trainerDetails, id) => this.patch("trainer/" + id, trainerDetails);
  update_trainer_photo = (formData, id) => this.patch("trainer/image/" + id, formData);
  get_one_trainer = (id) => this.get("trainer/" + id);
  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
  logout = () => {
    localStorage.removeItem("token");
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

let trainerService = new TrainerService();
export default trainerService;
