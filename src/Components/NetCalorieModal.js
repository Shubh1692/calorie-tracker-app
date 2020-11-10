import React from "react";
import * as moment from 'moment';
import { Modal } from 'semantic-ui-react';

const NetCalorieModal = ({
  open, handleClose, netCalorie,
}) => {
  const {
    foodCaloriesPerDay, date, bmr, activitiesCaloriesPerDay, netCalorie: netCalorieFromAPI
  } = netCalorie;
  return (
    <Modal closeIcon closeOnDimmerClick={false} open={open} onClose={handleClose}>
      <Modal.Header>Net Calorie of {moment(date).format('DD-MM-YYYY')}</Modal.Header>
      <Modal.Content>
        Net Calories per day = {foodCaloriesPerDay} (Food Calories per day)  – {bmr}(Basal Metabolic Rate)  - {activitiesCaloriesPerDay} (Activities Calories day per day)
        = {netCalorieFromAPI}
    </Modal.Content>
    </Modal>
  )
}
export default NetCalorieModal;
