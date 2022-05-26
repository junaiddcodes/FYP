import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class UserService extends GenericService {
  constructor() {
    super();
  }

  login = (email, password, role) =>
    new Promise((resolve, reject) => {
      this.post(`${role}/login`, { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  register_user = (customerDetails) => this.post("customer/register", customerDetails);
  buy_plan = (order) => this.post("order/ordercreate", order);
  get_user = (id) => this.get("customer/" + id);
  get_bought_plans = (id) => this.get("order/user/" + id);
  register_gym = (gymDetails) => this.post("gym/gymregister", gymDetails);
  register_trainer = (trainerDetails) => this.post("trainer/trainerregister", trainerDetails);
  logout = () => {
    localStorage.removeItem("token");
  };

  waterIntake = (water_intake) => {
    this.post("waterIntake/addWaterIntake", water_intake);
  };
  waterPage = (userId) => this.get("waterIntake/" + userId);

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
  getoneUser = (user_id) => this.get("customer/" + user_id);

  getFood = (foodName) => this.post("food/name", foodName);
  // Excercises
  getExcercise = (excerciseName) => this.post('excercise/name', excerciseName)
  postExcercise = (excercise) => this.post('SelectExcercise/addSelectexercise', excercise)
  getExcerciseData = (customerId) => this.get('SelectExcercise/user/' + customerId)
  editExcerciseData = (excerciseId,excerciseData) => this.patch('SelectExcercise/' + excerciseId, excerciseData)
  deleteExcerciseData = (excerciseId) => this.delete('SelectExcercise/' + excerciseId)
  get_single_excercise =(id)=>this.get("excercise/" + id)
// Meals
  getMealData = (customerId) => this.get('meal/mealdata/' + customerId)
  editMealData = (mealId,mealData) => this.patch('meal/' + mealId, mealData)
  deleteMealData = (mealId) => this.delete('meal/' + mealId)
  createMeal = (meal) => this.post('meal/addmeal', meal)

  get_single_food = (id) => this.get("food/" + id);
  // Conversation Chat
  createConvo = (convo) => this.post("conversation", convo);

  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == "admin") return true;
      else return false;
    } else return false;
  };
}

let userService = new UserService();
export default userService;
