import React, { useState } from "react";
import { AvForm, AvField, } from 'availity-reactstrap-validation';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { get, post } from '../config/api';
import { config } from '../config/api.constants';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import * as moment from 'moment';
import { DURATION } from "../config";
const AddCalorieOut = ({
    open, handleClose, createdBy
}) => {
    const [calorieOutFormValue, setCalorieInFormValue] = useState({
        date: '', activities: [{
            activity: '',
            duration: ''
        }]
    });
    const handleSubmit = async () => {
        const activities = calorieOutFormValue.activities.every(({
            activity, duration
        }) =>  (activity && duration));
        if (!activities) {
            alert('Please select activity and duration')
        }
        const calorieOutReq = await post(config.addCalorieOut, {
            createdBy,
            date: calorieOutFormValue.date,
            activities: calorieOutFormValue.activities.map(({
                duration, activity
            }) => ({
                duration: duration.value, activity: activity.value
            }))
        });
        if (calorieOutReq && calorieOutReq.data) {
            handleClose(calorieOutReq.data)
        }
    };

    const fetchActivities = async (inputValue, callback) => {
        if (!inputValue || !inputValue.trim().length) {
            return false;
        }
        const activitiesReq = await get(`${config.fetchActivities}${inputValue}`);
        if (activitiesReq && activitiesReq.data) {
            callback(activitiesReq.data.map(({
                motion, _id
            }) => ({
                label: motion, value: _id
            })));
        }
    }
    const handleChange = (key, value, index) => {
        if (typeof index === 'number') {
            calorieOutFormValue.activities[index][key] = value;
            return setCalorieInFormValue({
                ...calorieOutFormValue
            });
        }
        setCalorieInFormValue({
            ...calorieOutFormValue,
            ...{
                [key]: value
            }
        });
    };

    const addRemoveActivities = (index) => {
        if (typeof index === 'number') {
            calorieOutFormValue.activities.splice(index, 1);
        } else {
            calorieOutFormValue.activities.push({
                activity: '', duration: ''
            });
        }
        setCalorieInFormValue({
            ...calorieOutFormValue,
        });
    }
    return (
        <Modal closeOnDimmerClick={false} open={open} onClose={handleClose}>
            <Modal.Header> Add Calorie Out</Modal.Header>
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
                        <div className="field activities-label">
                            <label>Select Activities</label>
                            <Button onClick={() => addRemoveActivities()}>
                                <label>&nbsp;</label>
                                <Icon name='add' />
                            </Button>
                        </div>
                        {calorieOutFormValue.activities.map(({
                            activity, duration
                        }, index) => <div key={index} className="activities-dropdown">
                                <div className="field activities-dropdown-field activities-dropdown-field-activity">
                                    <label style={{ marginBottom: 5 }}>Activity</label>
                                    <AsyncSelect
                                        placeholder="Search for get activity list"
                                        value={activity}
                                        cacheOptions
                                        loadOptions={fetchActivities}
                                        defaultOptions onChange={(e) => handleChange('activity', e, index)} />
                                </div>
                                <div className="field activities-dropdown-field activities-dropdown-field-activity">
                                    <label style={{ marginBottom: 5 }}>Duration</label>
                                    <Select  value={duration} width={'100%'} options={DURATION} onChange={(e) => handleChange('duration', e, index)} />
                                </div>
                                <div className="field activities-dropdown-field-btn">
                                    <label>&nbsp;</label>
                                    <Button type="button" onClick={() => {
                                        if (calorieOutFormValue.activities.length > 1) {
                                            addRemoveActivities(index)
                                        }
                                    }}>
                                        <Icon name='trash' />
                                    </Button>
                                </div>

                            </div>)}

                    </div>
                </Modal.Content>
                <Modal.Actions className="newUserFooter">
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button type="submit" primary>Add Calorie Out</Button>
                </Modal.Actions>
            </AvForm>
        </Modal>
    )
}

export default AddCalorieOut;
