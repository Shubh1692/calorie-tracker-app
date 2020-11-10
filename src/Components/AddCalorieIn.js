import React, { useState } from "react";
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { Button, Modal } from 'semantic-ui-react';
import { post, get } from '../config/api';
import { config } from '../config/api.constants';
import { FOOD_TIME_LIST } from '../config';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import * as moment from 'moment';
const AddCalorieIn = ({
    open, handleClose, createdBy
}) => {
    const [calorieInFormValue, setCalorieInFormValue] = useState({
        date: '', food: '', time: ''
    });
    const handleSubmit = async () => {
        if (!calorieInFormValue.food || !calorieInFormValue.time || !calorieInFormValue.date) {
            if (!calorieInFormValue.food) {
                alert('Please select food')
            } else {
                alert('Please select food time')
            }
            return false;
        }
        const calorieInReq = await post(config.addCalorieIn, {
            ...calorieInFormValue, createdBy
        });
        if (calorieInReq && calorieInReq.data) {
            handleClose(calorieInReq.data)
        }
    };

    const fetchFoods = async (inputValue, callback) => {
        const foddReq = await get(`${config.fetchFoods}${inputValue}`);
        if (foddReq && foddReq.data) {
            callback(foddReq.data.map(({
                name, _id
            }) => ({
                label: name, value: _id
            })));
        }
    }
    const handleChange = (key, value) => {
        setCalorieInFormValue({
            ...calorieInFormValue,
            ...{
                [key]: value
            }
        });
    };

    return (
        <Modal closeOnDimmerClick={false} size={'medium'} open={open} onClose={handleClose}>
            <Modal.Header> Add Calorie In</Modal.Header>
            <AvForm className="p-20" onValidSubmit={handleSubmit}>
                <Modal.Content>
                    <div className="ui form">
                        <div className="field">
                            <AvField name="date" className="form-control" onChange={(e) => handleChange(e.target.name, e.target.value)} label="Enter Calorie In Date" type="date" validate={{
                                dateRange: { start: { value: moment().subtract(30, 'days').format('DD-MM-YYYY'), }, end: { value: moment().format('DD-MM-YYYY') } },
                                required: {
                                    value: true,
                                    errorMessage: "This field is required to proceed",
                                },
                            }} />

                        </div>
                        <div className="field">
                            <label>Food</label>
                            <AsyncSelect
                                placeholder="Search for get food list"
                                cacheOptions
                                loadOptions={fetchFoods}
                                defaultOptions onChange={(e) => handleChange('food', e.value)} />
                        </div>
                        <div className="field">
                            <label>Food Time</label>
                            <Select options={FOOD_TIME_LIST} onChange={(e) => handleChange('time', e.value)} />
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Actions className="newUserFooter">
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button type="submit" primary>Add Calorie In</Button>
                </Modal.Actions>
            </AvForm>
        </Modal>
    )
}

export default AddCalorieIn;
