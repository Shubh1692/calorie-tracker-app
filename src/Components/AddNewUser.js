import React, { useState } from "react";
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { Button, Modal } from 'semantic-ui-react';
import { post } from '../config/api';
import { config } from '../config/api.constants';
import { GENDER_LIST } from '../config';

const AddNewUser = ({
  open, handleClose, addNewUserInList
}) => {
  const [userFormValue, setUserFormValue] = useState({
    name: '', weight: 0, height: 0, dob: null, sex: ''
  });
  const handleSubmit = async () => {
    const addUserReq = await post(config.createUser, userFormValue);
    if (addUserReq && addUserReq.data) {
      addNewUserInList(addUserReq.data);
      handleClose();
    }
  };

  const handleChange = (key, value) => {
    setUserFormValue({
      ...userFormValue,
      ...{
        [key]: value
      }
    });
  };
  return (
    <Modal closeOnDimmerClick={false}size={'mini'} open={open} onClose={handleClose}>
      <Modal.Header> Add New User</Modal.Header>
      <AvForm className="p-20" onValidSubmit={handleSubmit}>
        <Modal.Content>
          <div className="ui form">
            <div className="field">
              <AvField
                label="Enter Your Name" required
                className="form-control"
                name="name"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={userFormValue.name || ""}
                placeholder="Enter your Name*"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "This field is required to proceed",
                  },
                }} />
            </div>
            <div className="field">
              <AvField
                label="Enter Your Weight"
                type="number"
                required
                className="form-control"
                name="weight"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={userFormValue.weight || ""}
                placeholder="Enter your weight*"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "This field is required to proceed",
                  },
                }} />
            </div>
            <div className="field">
              <AvField
                label="Enter Your Height"
                type="number"
                required
                className="form-control"
                name="height"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={userFormValue.height || ""}
                placeholder="Enter your Height*"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "This field is required to proceed",
                  },
                }} />
            </div>
            <div className="field">
              <AvField name="dob" className="form-control" value={userFormValue.dob} onChange={(e) => handleChange(e.target.name, e.target.value)} label="Enter Your DOB" type="date"
                validate={{
                  required: {
                    value: true,
                    errorMessage: "This field is required to proceed",
                  },
                }} />
            </div>
            <div className="field">
              <label>Gender</label>
              <select onChange={(e) => handleChange(e.target.name, e.target.value)} value={userFormValue.sex} name="sex">
                <option value={''}>Select Gender</option>
                {GENDER_LIST.map(({ value, label }) => (
                  <option key={value} value={value} >{label}</option>
                ))}
              </select>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="newUserFooter">
          <Button onClick={handleClose}>CANCEL</Button>
          <Button type="submit" primary>CREATE</Button>
        </Modal.Actions>
      </AvForm>
    </Modal>
  )
}

export default AddNewUser;
