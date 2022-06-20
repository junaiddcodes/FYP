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
import SideMenuAdmin from "../../Components/SideMenuAdmin";
import { useNavigate } from "react-router-dom";
import gymService from "../../services/GymService";
import trainerService from "../../services/TrainerService";
import adminService from "../../services/AdminService";
import userService from "../../services/UserService";

const AdminDashboard = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [allGyms, setAllGyms] = useState([]);
  const [allTrainers, setAllTrainers] = useState([]);
  const [allQueries, setAllQueries] = useState([]);
  const [withdrawTrainer, setWithdrawTrainer] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [withdrawUser, setWithdrawUser] = useState("");
  const [withdrawData, setWithdrawData] = useState("");
  const navigate = useNavigate();

  function withdrawDatas(id) {
    adminService
      .get_withdraw_request(id)
      .then((data) => {
        setWithdrawData(data.crud);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function submitWithdraw(id, user_type, amount, user_id) {
    var withdrawReq = {
      use_type: user_type,
      amount: amount,
      user_id: user_id,
    };

    console.log(withdrawReq)

    adminService
      .update_withdraw(id, withdrawReq)
      .then((e) => {
        console.log("Withdraw Updated");
        setEditModalOpen(false);
        getWithdrawDetails()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUser(id, user_type) {
    if (user_type == "trainer") {
      trainerService
        .get_one_trainer(id)
        .then((data) => {
          setWithdrawUser(data.crud);
          console.log(data.crud);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user_type == "gym") {
      gymService
        .get_one_gym(id)
        .then((data) => {
          setWithdrawUser(data.crud);
          console.log(data.crud);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleRouteGym = (e) => {
    console.log(e);
    navigate("/admin-gym-request", { state: { e } });
  };
  const handleRouteTrainer = (e) => {
    console.log(e);
    navigate("/admin-trainer-request", { state: { e } });
  };
  const handleRouteQuery = (e) => {
    console.log(e);
    navigate("/admin-query-details", { state: { e } });
  };

  function getWithdrawDetails() {
    adminService.get_withdraw().then((data) => {
      setWithdrawTrainer(data.crud);
      console.log(data);
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
        userService.getLoggedInUser().user_type == "trainer"
      ) {
        navigate("/login");
      }
    }

    gymService
      .get_all_not_listed_gyms()
      .then((data) => {
        console.log(data);
        setAllGyms(data.crud);
      })
      .catch((err) => {
        console.log(err);
      });

    trainerService
      .get_all_not_listed_trainers()
      .then((data) => {
        console.log(data);
        setAllTrainers(data.crud);
      })
      .catch((err) => {
        console.log(err);
      });
    adminService
      .get_all_queries()
      .then((data) => {
        console.log("queires = ", data);
        setAllQueries(data.crud);
      })
      .catch((err) => {
        console.log(err);
      });

    getWithdrawDetails();

    console.log("after request");
  }, []);
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenuAdmin />
      <h3 id="gym-reqs">Gym Requests</h3>
      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Gym Id</th>
                    <th>Gym Name</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allGyms.length == 0 ? (
                    <tr>
                      <td>No gym requests</td>
                    </tr>
                  ) : (
                    allGyms.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{e.user_id.full_name}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                onClick={(event) => {
                                  handleRouteGym(e);
                                }}
                              >
                                Check Profile
                              </Button>
                            </div>
                          </td>
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
      <h3 className="mt-4" id="trainer-reqs">
        Trainer Requests
      </h3>
      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Trainer Id</th>
                    <th>Trainer Name</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allTrainers.length == 0 ? (
                    <tr>
                      <td>No trainer requests</td>
                    </tr>
                  ) : (
                    allTrainers.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{e.user_id.full_name}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                onClick={(event) => {
                                  handleRouteTrainer(e);
                                }}
                              >
                                Check Profile
                              </Button>
                            </div>
                          </td>
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
      <h3 className="mt-4" id="queries">
        Queries
      </h3>
      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Query Id</th>
                    <th>Query Subject</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allQueries.length == 0 ? (
                    <tr>
                      <td>No Queries</td>
                    </tr>
                  ) : (
                    allQueries.map((e, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{e.query_subject}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                onClick={(event) => {
                                  handleRouteQuery(e);
                                }}
                              >
                                Details
                              </Button>
                            </div>
                          </td>
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
      <h3 className="mt-4" id="payment">
        Payment Requests
      </h3>
      <div className="admin-box mt-3">
        <div className="user-box d-flex flex-column p-3">
          <div className="d-flex flex-column">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>User Type</th>
                    <th>Withdraw Amount (Rs)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawTrainer.length == 0 ? (
                    <tr>
                      <p>Not any Request</p>
                    </tr>
                  ) : (
                    withdrawTrainer.map((e, key) => {
                      return (
                        <tr key={key}>
                          <td>{e.user_id}</td>
                          <td>{e.user_type}</td>
                          <td>{e.amount}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div>
                                <Button
                                  className="btn btn-primary edit-btn"
                                  onClick={() => {
                                    setEditModalOpen(true);
                                    getUser(e.user_id, e.user_type);
                                    withdrawDatas(e._id);
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

                                      <h2>Withdraw Request</h2>
                                      {withdrawUser != "" ? (
                                        <div className="mt-2 text-light">
                                          <p className="text-light">
                                            Id: {withdrawUser._id}
                                          </p>
                                          <p className="text-light">
                                            {withdrawUser.user_id.user_type}{" "}
                                            Name:{" "}
                                            {withdrawUser.user_id.full_name}
                                          </p>
                                          <p className="text-light">
                                            Email: {withdrawUser.user_id.email}
                                          </p>
                                          <p className="text-light">
                                            Bank Name:{" "}
                                            {
                                              withdrawUser.bank_details
                                                .bank_name
                                            }
                                          </p>
                                          <p className="text-light">
                                            Account Number:{" "}
                                            {
                                              withdrawUser.bank_details
                                                .account_number
                                            }
                                          </p>
                                          <p className="text-light">
                                            Account Name:{" "}
                                            {
                                              withdrawUser.bank_details
                                                .account_name
                                            }
                                          </p>
                                          <p className="text-light">
                                            Withdraw Amount(Rs):{" "}
                                            {withdrawData.amount}
                                          </p>
                                          <div className="mt-3">
                                            <Button
                                              onClick={() => {
                                                submitWithdraw(
                                                  withdrawData._id,
                                                  withdrawUser.user_id.user_type,
                                                  withdrawData.amount,
                                                  withdrawUser._id
                                                );
                                                console.log("test");
                                              }}
                                            >
                                              Submit
                                            </Button>
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                  </Modal>
                                </div>
                              </div>
                            </div>
                          </td>
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
    </div>
  );
};

export default AdminDashboard;
