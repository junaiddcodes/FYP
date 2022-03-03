import React, { useState } from "react";
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

const AdminDashboard = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
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
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Link to="/admin-gym-request">
                          <Button>Check Profile</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>Check Profile</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>Check Profile</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>Check Profile</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>Check Profile</Button>
                      </div>
                    </td>
                  </tr>
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
                  <tr>
                    <td>001</td>
                    <td>Hamza Kasim</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Link to="/admin-trainer-request">
                          <Button>Check Profile</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>Check Profile</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>Check Profile</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>Check Profile</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Mister Fit Gym</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>Check Profile</Button>
                      </div>
                    </td>
                  </tr>
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
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Link to="/admin-query-details">
                          <Button>View Details</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>View Details</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>View Details</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>View Details</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>View Details</Button>
                      </div>
                    </td>
                  </tr>
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
                    <th>Trainer Id</th>
                    <th>Trainer Name</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>001</td>
                    <td>Hamza Kasim</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Link to="/admin-query-details">
                          <Button>View Details</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>View Details</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>View Details</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>View Details</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>001</td>
                    <td>Payment Issue</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button>View Details</Button>
                      </div>
                    </td>
                  </tr>
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
