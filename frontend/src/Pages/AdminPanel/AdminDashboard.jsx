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

const AdminDashboard = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="page-container-admin">
      <h3>Gym Requests</h3>
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
      <h3 className="mt-4">Trainer Requests</h3>
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
      <h3 className="mt-4">Queries</h3>
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
