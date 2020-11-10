import React, { useState } from "react";
import DeleteUser from "./DeleteUser";
import AddCalorieIn from "./AddCalorieIn";
import AddCalorieOut from "./AddCalorieOut";
import moment from "moment";
import { Accordion, Icon, Button } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import NetCalorieModal from "./NetCalorieModal";
import { get } from '../config/api';
import { config } from '../config/api.constants';
const UserList = ({
  userList, handleDelete
}) => {
  const [popupData, setPopupData] = useState({
    deleteUser: null,
    calorieIn: null,
    calorieOut: null
  })
  const [accordionIndex, setActiveAccordionIndex] = useState(null);

  const fetchNetCalorie = async (userId, date) => {
    const netCalorieRes = await get(`${config.fetchNetCalorie}${userId}/${date}`);
    if (netCalorieRes && netCalorieRes.data) {
      setPopupData({
        deleteUser: null,
        calorieIn: null,
        calorieOut: null,
        netCalorie: {
          ...netCalorieRes.data[0],
          date
        }
      })
    }
  }
  return (
    <div className="userList">
      <div className="ui middle aligned divided list userListcard">

        <Accordion fluid styled>
          {userList.map(({
            _id, name, weight, height, dob
          }) => (
              <div key={_id}>
                <Accordion.Title
                  onClick={() => accordionIndex === _id ? setActiveAccordionIndex(null) : setActiveAccordionIndex(_id)}
                  active={accordionIndex === _id}
                  index={_id}>
                  <div className="userName">
                    <Icon name='dropdown' />
                    <div >{name}</div>
                  </div>

                </Accordion.Title>
                <Accordion.Content active={accordionIndex === _id}>
                  <div className="detail-container" >
                    <div className="content-detail">
                      <div className="userDetails">
                        <b>Weight</b>
                        <span>{weight} Kg</span>
                      </div>
                      <div className="userDetails">
                        <b>Height</b>
                        <span>{height} Centimeter</span>
                      </div>
                      <div className="userDetails">
                        <b>Date of Birth</b>
                        <span>{moment(dob).format('DD/MM/YYYY')}</span>
                      </div>
                    </div>
                    <div className="content-detail">
                      <div className="calorie-btn-gp">
                        <Button onClick={() => setPopupData({
                          deleteUser: null,
                          calorieIn: {
                            _id
                          },
                          calorieOut: null
                        })}>Add Calorie In</Button>

                        <Button onClick={() => setPopupData({
                          deleteUser: null,
                          calorieOut: {
                            _id
                          },
                          calorieIn: null
                        })}>Add Calorie Out</Button>
                        <Button onClick={() => setPopupData({
                          calorieIn: null,
                          deleteUser: {
                            _id
                          },
                          calorieOut: null
                        })}><Icon name='trash' />
                        Delete</Button>
                      </div>
                      <div>
                        <label style={{
                          fontWeight: 'bold'
                        }}>
                          PLease Select a date for see net calorie of selected date
                        </label>
                        <DatePicker
                          onChange={(e) => {
                            fetchNetCalorie(_id, e)
                          }}
                          inline
                        />
                      </div>
                    </div>

                  </div>
                </Accordion.Content>
              </div>
            ))}
        </Accordion>
      </div>

      {popupData.deleteUser && <DeleteUser
        open={!!popupData.deleteUser}
        handleClose={() => setPopupData({
          deleteUser: null,
          calorieIn: null,
          calorieOut: null,
          netCalorie: null
        })}
        handleDelete={() => {
          setPopupData({
            deleteUser: null,
            calorieIn: null,
            calorieOut: null,
            netCalorie: null
          });
          handleDelete(popupData.deleteUser._id)
        }}
      />}
      {popupData.calorieIn && <AddCalorieIn
        open
        createdBy={popupData.calorieIn._id}
        handleClose={() => setPopupData({
          deleteUser: null,
          calorieIn: null,
          calorieOut: null,
          netCalorie: null
        })}
      />}
      {popupData.calorieOut && <AddCalorieOut
        open
        createdBy={popupData.calorieOut._id}
        handleClose={() => setPopupData({
          deleteUser: null,
          calorieIn: null,
          calorieOut: null,
          netCalorie: null
        })}
      />}
      {popupData.netCalorie && <NetCalorieModal
        open
        netCalorie={popupData.netCalorie}
        handleClose={() => setPopupData({
          deleteUser: null,
          calorieIn: null,
          calorieOut: null,
          netCalorie: null
        })}
      />}
    </div>
  )
}

export default UserList;
