import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../../Components/TopBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SideMenuTrainer from "../../Components/SideMenuTrainer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";
import trainerService from "../../services/TrainerService";
import { useLocation } from "react-router-dom";

const planDescSchema = yup.object().shape({
  plan_title: yup.string().required("Plan title is required!"),
  plan_duration: yup
    .number()
    .typeError("Plan duration is required!")
    .positive("Plan duration should be a positive number")
    .required("Plan duration price is required!"),
  plan_price: yup
    .number()
    .typeError("Plan price is required!")
    .positive("Plan price should be a positive number")
    .required("Plan price price is required!"),
  plan_desc: yup
    .string()
    .min(50, "Description must be at least 50 characters!")
    .required("Description can't be empty"),
});

const planSchema = yup.object().shape({
  monday_activity: yup
    .string()

    .required("Activity details can't be empty"),
  tuesday_activity: yup
    .string()

    .required("Activity details can't be empty"),
  wednesday_activity: yup
    .string()

    .required("Activity details can't be empty"),
  thursday_activity: yup
    .string()

    .required("Activity details can't be empty"),
  friday_activity: yup
    .string()

    .required("Activity details can't be empty"),
  saturday_activity: yup
    .string()

    .required("Activity details can't be empty"),
  sunday_activity: yup
    .string()

    .required("Activity details can't be empty"),
});

const CreatePlan = () => {
  const [isStep1, setIsStep1] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isStep2, setIsStep2] = useState(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");
  var userId = "";
  const [activityDetails, setActivityDetails] = useState({
    trainer_id: "",
    plan_title: "",
    plan_duration: "",
    plan_price: "",
    plan_desc: "",

    monday_activities: "",
    tuesday_activities: "",
    wednesday_activities: "",
    thursday_activities: "",
    friday_activities: "",
    saturday_activities: "",
    sunday_activities: "",
  });

  const {
    register: controlPlanDesc,
    handleSubmit: handleSubmitPlanDesc,
    formState: { errors: errorsPlanDesc },
  } = useForm({
    resolver: yupResolver(planDescSchema),
  });
  const {
    register: controlPlan,
    handleSubmit: handleSubmitPlan,
    formState: { errors: errorsPlan },
  } = useForm({
    resolver: yupResolver(planSchema),
  });

  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      userId = userService.getLoggedInUser()._id;
      console.log(userId);
      if (
        userService.getLoggedInUser().user_type == "customer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }

    if (location.state) {
      setTitle(location.state.e.plan_title);
      setDuration(location.state.e.plan_duration);
      setPrice(location.state.e.plan_price);
      setDesc(location.state.e.plan_desc);
      setMonday(location.state.e.monday_activities);
      setTuesday(location.state.e.tuesday_activities);
      setWednesday(location.state.e.wednesday_activities);
      setThursday(location.state.e.thursday_activities);
      setFriday(location.state.e.friday_activities);
      setSaturday(location.state.e.saturday_activities);
      setSunday(location.state.e.sunday_activities);
    }
  }, []);

  const submitPlanDesc = (data) => {
    setActivityDetails({
      ...activityDetails,
      trainer_id: userId,
      plan_title: data.plan_title,
      plan_duration: data.plan_duration,
      plan_price: data.plan_price,
      plan_desc: data.plan_desc,
    });
    console.log(activityDetails);
    setIsStep2(true);
    setIsStep1(false);
  };

  const submitPlan = (data) => {
    var activityDescDetails = activityDetails;
    activityDescDetails = {
      ...activityDescDetails,

      monday_activities: data.monday_activity,
      tuesday_activities: data.tuesday_activity,
      wednesday_activities: data.wednesday_activity,
      thursday_activities: data.thursday_activity,
      friday_activities: data.friday_activity,
      saturday_activities: data.saturday_activity,
      sunday_activities: data.sunday_activity,
    };

    console.log(activityDescDetails);
    if (location.state.edit == false) {
      trainerService
        .create_plan(activityDescDetails)
        .then((data) => {
          console.log(data);
          // props.history.push("/login");
          navigate("/trainer-activity-plans");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      trainerService
        .update_plan(activityDescDetails, location.state.e._id)
        .then((data) => {
          console.log(data);
          // props.history.push("/login");
          navigate("/trainer-activity-plans");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="page-container-gym">
      <TopBar />
      <SideMenuTrainer />
      <h2>Create Activity Plan</h2>
      {isStep1 ? (
        <div className="gym-box mt-3 d-flex flex-column align-items-left">
          <form onSubmit={handleSubmitPlanDesc(submitPlanDesc)} className="d-flex flex-column">
            <div className="input-text d-flex flex-column">
              <label for="lname">Enter plan title</label>
              <input
                type="text"
                id=""
                name=""
                {...controlPlanDesc("plan_title")}
                // value={title}
                // onChange={(e) => {
                //   setTitle(e.target.value);
                // }}
              />
              <p>{errorsPlanDesc.plan_title?.message}</p>

              <label for="lname">Enter plan duration in weeks</label>
              <input
                type="number"
                id=""
                name=""
                placeholder="E.g. 4"
                {...controlPlanDesc("plan_duration")}
                // value={duration}
                // onChange={(e) => {
                //   setDuration(e.target.value);
                // }}
              />
              <p>{errorsPlanDesc.plan_duration?.message}</p>
              <label for="lname">Enter plan price in PKR</label>
              <input
                type="number"
                id=""
                name=""
                placeholder="E.g. 3000"
                {...controlPlanDesc("plan_price")}
                // value={price}
                // onChange={(e) => {
                //   setPrice(e.target.value);
                // }}
              />
              <p>{errorsPlanDesc.plan_price?.message}</p>
            </div>

            <label for="lname">Describe your plan</label>

            <textarea
              className="text-field mt-2"
              placeholder="Plan description"
              {...controlPlanDesc("plan_desc")}
              // value={desc}
              // onChange={(e) => {
              //   setDesc(e.target.value);
              // }}
            />
            <p>{errorsPlanDesc.plan_desc?.message}</p>
            <div className="d-flex justify-content-end">
              <Button type="submit" className="mt-4 w-25">
                Next
              </Button>
            </div>
          </form>
        </div>
      ) : isStep2 ? (
        <div className="gym-box mt-3 d-flex flex-column align-items-left">
          <form onSubmit={handleSubmitPlan(submitPlan)} className="d-flex flex-column">
            <div className="input-text d-flex flex-column">
              <h3>Enter Activities</h3>
              <label for="lname">Monday Activities ( in bullets )</label>
              <textarea
                className="text-field2 mt-2"
                placeholder="e.g.&#10;- activity 1&#10;- activity 2 "
                {...controlPlan("monday_activity")}
                // value={monday}
                // onChange={(e) => {
                //   setMonday(e.target.value);
                // }}
              />
              <p>{errorsPlan.monday_activity?.message}</p>
              <label for="lname">Tuesday Activities ( in bullets )</label>
              <textarea
                className="text-field2 mt-2"
                placeholder="e.g.&#10;- activity 1&#10;- activity 2 "
                {...controlPlan("tuesday_activity")}
                // value={tuesday}
                // onChange={(e) => {
                //   setTuesday(e.target.value);
                // }}
              />
              <p>{errorsPlan.tuesday_activity?.message}</p>
              <label for="lname">Wednesday Activities ( in bullets )</label>
              <textarea
                className="text-field2 mt-2"
                placeholder="e.g.&#10;- activity 1&#10;- activity 2 "
                {...controlPlan("wednesday_activity")}
                // value={wednesday}
                // onChange={(e) => {
                //   setWednesday(e.target.value);
                // }}
              />
              <p>{errorsPlan.wednesday_activity?.message}</p>
              <label for="lname">Thursday Activities ( in bullets )</label>
              <textarea
                className="text-field2 mt-2"
                placeholder="e.g.&#10;- activity 1&#10;- activity 2 "
                {...controlPlan("thursday_activity")}
                // value={thursday}
                // onChange={(e) => {
                //   setThursday(e.target.value);
                // }}
              />
              <p>{errorsPlan.thursday_activity?.message}</p>
              <label for="lname">Friday Activities ( in bullets )</label>
              <textarea
                className="text-field2 mt-2"
                placeholder="e.g.&#10;- activity 1&#10;- activity 2 "
                {...controlPlan("friday_activity")}
                // value={friday}
                // onChange={(e) => {
                //   setFriday(e.target.value);
                // }}
              />
              <p>{errorsPlan.friday_activity?.message}</p>
              <label for="lname">Saturday Activities ( in bullets )</label>
              <textarea
                className="text-field2 mt-2"
                placeholder="e.g.&#10;- activity 1&#10;- activity 2 "
                {...controlPlan("saturday_activity")}
                // value={saturday}
                // onChange={(e) => {
                //   setSaturday(e.target.value);
                // }}
              />
              <p>{errorsPlan.saturday_activity?.message}</p>
              <label for="lname">Sunday Activities ( in bullets )</label>
              <textarea
                className="text-field2 mt-2"
                placeholder="e.g.&#10;- activity 1&#10;- activity 2 "
                {...controlPlan("sunday_activity")}
                // value={sunday}
                // onChange={(e) => {
                //   setSunday(e.target.value);
                // }}
              />
              <p>{errorsPlan.sunday_activity?.message}</p>
            </div>
            <Button type="submit" className="w-25 mt-4">
              Submit Plan
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default CreatePlan;
