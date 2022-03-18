import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TopBar from "../../Components/TopBar";
import SideMenu from "../../Components/SideMenu";


const AddWater = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="page-container-user">

      <TopBar />
      <SideMenu />

      <h2>Add Water</h2>
      <div className="user-box d-flex flex-column p-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div className="d-flex w-50 flex-column">
              <h4 className="mt-2 mb-2">Water Taken (ltrs): </h4>
              <h4 className="mt-2">Water Goal (ltrs): </h4>
            </div>
          </div>
          <div className="d-flex flex-column mt-3"></div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3">Water Taken</h2>
      </div>
      <div className="align-items-left">
        <input className="input-modal" type="number" placeholder="Water in Ltrs" />
      </div>
      <Button className="mt-3">+ Add Water</Button>
    </div>
  );
};

export default AddWater;
