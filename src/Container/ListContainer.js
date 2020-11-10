import React, { useState, useEffect, Fragment } from 'react';
import NoUserAdded from '../Components/NoUserAdded';
import UserList from '../Components/UserList';
import { deleteApi, get } from '../config/api';
import { config } from '../config/api.constants';
import AddNewUser from '../Components/AddNewUser';

const ListContainer = () => {
    const [userList, setUserList] = useState([]);
    const [openAddUserPopup, setResetAddUserPopup] = useState(false);
    useEffect(() => {
        fetchUserList();
    }, []);
    const fetchUserList = async () => {
        const userListReq = await get(config.fetchUsers);
        if (userListReq && userListReq.data) {
            setUserList(userListReq.data);
        }
    };
    const addNewUserInList = (user) => {
        setUserList([...userList, user]);
    };

    const handleDelete = async (userId) => {
        const deleteUserReq = await deleteApi(`${config.deleteUser}${userId}`);
        if (deleteUserReq && deleteUserReq.data) {
            const findDeletedUserIndex = userList.findIndex(({
                _id
            }) => userId === _id);
            if (findDeletedUserIndex > -1) {
                userList.splice(findDeletedUserIndex, 1)
                setUserList([...userList]);
            }
        }
    }
   
    return (
        <Fragment>
            <div className="appHeader">
                <div className='title'><h3>User List</h3></div>
                <button onClick={() => setResetAddUserPopup(true)} className="ui primary basic button">Add User</button>
            </div>
            <div className="listCard">
                {userList.length === 0 ? <NoUserAdded /> : <UserList userList={userList}  handleDelete={(userId)=> handleDelete(userId)}/>}
            </div>
            <AddNewUser open={openAddUserPopup} handleClose={() => setResetAddUserPopup(false)} 
            addNewUserInList={(user) => addNewUserInList(user)}/>
        </Fragment>)
}
export default ListContainer;
