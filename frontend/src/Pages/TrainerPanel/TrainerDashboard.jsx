import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";
import { MdLocationPin } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import TopBar from "../../Components/TopBar";
import SideMenuTrainer from "../../Components/SideMenuTrainer";
import { useNavigate } from "react-router-dom";
import userService from "../../services/UserService";
import trainerService from "../../services/TrainerService";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const userId = userService.getLoggedInUser()._id;
  const [boughtPlans, setBoughtPlans] = useState([]);
  const [totalEarning, setTotalEarning] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBankOpen, setEditBankOpen] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const schema = yup.object().shape({
    bank_name: yup.string().required("Bank Name is Required"),
    account_number: yup.string().required("Account Number is Required"),
    account_name: yup.string().required("Account Name is Required"),
  });
  const [getTrainer, setGetTrainer] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function withdrawRequest() {

    var withdrawReq = {
      user_id: userId,
      amount: withdrawAmount,
      user_type: "trainer",
    };

    trainerService
      .withdraw_request(withdrawReq)
      .then((res) => {
        console.log("Withdraw Request Confirmed");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTrainerSales() {
    var totalPrice = 0;
    var withdrawPrice = 0;
    trainerService
      .get_bought_plans(userId)
      .then((res) => {
        setBoughtPlans(res.crud);
        res.crud.map((e) => {
          totalPrice = e.price + totalPrice;
          if (e.withdraw) {
            withdrawPrice = withdrawPrice + e.price;
          }
        });
        setTotalEarning(totalPrice);
        setWithdrawAmount(withdrawPrice);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function findTrainer() {
    trainerService
      .get_one_trainer(userId)
      .then((res) => {
        if (res.crud.bank_details) {
          setIsBank(true);
        }
        setGetTrainer(res.crud);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleBanksubmit(data) {
    var bankDetails = {
      bank_details: {
        bank_name: data.bank_name,
        account_number: data.account_number,
        account_name: data.account_name,
      },
    };

    trainerService
      .update_trainer(bankDetails, userId)
      .then((res) => {
        console.log("Bank Added Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (userService.isLoggedIn() == false) {
      navigate("/login");
    } else {
      if (
        userService.getLoggedInUser().user_type == "customer" ||
        userService.getLoggedInUser().user_type == "gym" ||
        userService.getLoggedInUser().user_type == "admin"
      ) {
        navigate("/login");
      }
    }
    getTrainerSales();
    findTrainer();
  }, []);
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenuTrainer />
      <h3>Recent Plan Sales</h3>
      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <p className="font-weight-bold">
              Available to Withdraw (Rs): {withdrawAmount.length !=0?withdrawAmount:0}
            </p>
            <p className="font-weight-bold">
              Total Earning (Rs): {totalEarning.length !=0?totalEarning:0}
            </p>
          </div>
        </div>
      </div>
      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Activity Plan Title</th>
                    <th>Earnings (Rs)</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {boughtPlans.length == 0 ? (
                    <tr>
                      <td>There are no Sales for now</td>
                    </tr>
                  ) : (
                    boughtPlans.map((e, key) => {
                      return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{e.plan_title}</td>
                          <td>{e.price}</td>
                          {e.withdraw ? (
                            <td>Available for Withdraw</td>
                          ) : (
                            <td>Withdrawn</td>
                          )}
                          <td>{moment(e.time_date).format("DD/MM/YYYY")}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 d-flex">
        <div>
          <Button
            className="btn btn-primary edit-btn"
            onClick={() => {
              setEditModalOpen(true);
            }}
          >
            Withdraw
          </Button>
          <div className="modal-container">
            <Modal
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,

                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                  color: "white",
                  position: "absolute",
                  top: "40px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  background: "rgba(0,30,60,1)",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "1rem",
                  outline: "none",
                  padding: "20px",
                },
              }}
              className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
              isOpen={editModalOpen}
              onRequestClose={() => {
                setEditModalOpen(false);
              }}
            >
              <div className="modal-inner w-75 py-3 text-light">
                <a
                  onClick={() => {
                    setEditModalOpen(false);
                  }}
                >
                  <i class="bx bx-x"></i>
                </a>

                <div className="mt-2">
                  <h2>Withdraw</h2>
                  <p className="text-light">
                    Withdraw Amount Should be Greater Than Rs 10000
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-light">
                    Withdraw Amount(Rs): {withdrawAmount}
                  </p>
                  {withdrawAmount < 10000 ? (
                    <p className="text-danger">
                      Withdraw amount is less than Rs 10000
                    </p>
                  ) : null}
                  {isBank ? (
                    <div>
                      <p className="text-light">
                        Bank Name: {getTrainer.bank_details?.bank_name}
                      </p>
                      <p className="text-light">
                        Account#: {getTrainer.bank_details?.account_number}
                      </p>
                      <p className="text-light">
                        Account Name: {getTrainer.bank_details?.account_name}
                      </p>
                    </div>
                  ) : (
                    <p className="text-light">
                      Bank is not Added yet.{" "}
                      <a
                        className="text-underline"
                        onClick={() => {
                          setEditModalOpen(false);
                          setEditBankOpen(true);
                        }}
                      >
                        Click here to add the Banks
                      </a>
                    </p>
                  )}
                </div>
                {withdrawAmount >= 10000 && isBank ? (
                  <div className="mt-2">
                    <Button
                      className="btn btn-primary edit-btn"
                      onClick={() => {
                        console.log("Text");
                        withdrawRequest()
                      }}
                    >
                      Confirm Withdraw
                    </Button>
                  </div>
                ) : null}
              </div>
            </Modal>
          </div>
        </div>

        <div>
          <Button
            className="btn btn-primary edit-btn"
            onClick={() => {
              setEditBankOpen(true);
            }}
          >
            Bank Details
          </Button>
          <div className="modal-container">
            <Modal
              style={{
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,

                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                  color: "white",
                  position: "absolute",
                  top: "40px",
                  left: "40px",
                  right: "40px",
                  bottom: "40px",
                  background: "rgba(0,30,60,1)",
                  overflow: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "1rem",
                  outline: "none",
                  padding: "20px",
                },
              }}
              className="w-50 d-flex flex-column justify-content-around align-items-center add-food-modal"
              isOpen={editBankOpen}
              onRequestClose={() => {
                setEditBankOpen(false);
              }}
            >
              <div className="modal-inner w-75 py-3 text-light">
                <a
                  onClick={() => {
                    setEditBankOpen(false);
                  }}
                >
                  <i class="bx bx-x"></i>
                </a>
                <h2 className="text-light">Enter Bank Details</h2>
                <form
                  onSubmit={handleSubmit(handleBanksubmit)}
                  className="d-flex flex-column"
                >
                  <div className="mt-2">
                    <TextField
                      id="demo-simple-select-2"
                      className="w-100"
                      variant="outlined"
                      name="bank_name"
                      type="text"
                      {...register("bank_name")}
                      placeholder="Enter Bank Name"
                      InputLabelProps={{
                        style: { color: "#777" },
                      }}
                    />
                    <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                      {errors.bank_name?.message}
                    </p>
                  </div>
                  <div className="mt-2">
                    <TextField
                      id="demo-simple-select-2"
                      className="w-100"
                      variant="outlined"
                      name="account_number"
                      type="text"
                      {...register("account_number")}
                      placeholder="Enter Account Number"
                      InputLabelProps={{
                        style: { color: "#777" },
                      }}
                    />
                    <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                      {errors.account_number?.message}
                    </p>
                  </div>
                  <div className="my-2">
                    <TextField
                      id="demo-simple-select-2"
                      className="w-100"
                      variant="outlined"
                      name="account_name"
                      type="text"
                      {...register("account_name")}
                      placeholder="Enter Account Name"
                      InputLabelProps={{
                        style: { color: "#777" },
                      }}
                    />
                    <p id="error-text" style={{ color: "rgb(255, 34, 34)" }}>
                      {errors.account_name?.message}
                    </p>
                  </div>
                  <div>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
