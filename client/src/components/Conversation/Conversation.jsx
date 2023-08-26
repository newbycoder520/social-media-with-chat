import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux"
import WidgetWrapper from "components/WidgetWrapper";
const Conversation = ({ data, currentUser, online }) => {

  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  useEffect(()=> {

    const userId = data.members.find((id) => id !== currentUser);
    const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

    getUser();
  }, [])
  return (
    <> <div></div>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={user?.picturePath? process.env.REACT_APP_PUBLIC_FOLDER + user.picturePath : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"}
            alt="Profile"
            className="followerImage"
            style={{ width: "60px", height: "60px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{user?.firstName} {user?.lastName}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <Divider />
      </>
  
  );
};

export default Conversation;