import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class TrainerService extends GenericService {
  constructor() {
    super();
  }
  register_trainer = (trainerDetails) => this.post("trainer/trainerregister", trainerDetails);
  create_plan = (activityDetails) => this.post("createplan/createplan", activityDetails);
  get_all_not_listed_trainers = () => this.get("trainer/not-listed");
  get_plans = (id) => this.get("createplan/" + id);
  update_trainer = (trainerDetails, id) => this.patch("trainer/" + id, trainerDetails);
  update_plan = (planDetails, id) => this.patch("createplan/" + id, planDetails);
  update_trainer_photo = (formData, id) => this.patch("trainer/image/" + id, formData);
  get_search_trainers = (filter) => this.post("trainer/search", filter);
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
