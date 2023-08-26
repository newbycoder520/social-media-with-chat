import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import './UsersPage.css'
import Navbar from '../../scenes/navbar/index'
import FlexBetween from "components/FlexBetween";
import UserImage2 from "components/UserImage2";
import UserBackground from "components/UserBackground";
import { useDispatch } from "react-redux";
import Friend from "components/Friend";

const FriendsPage = ({ userId }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const friends = useSelector((state) => state.user.friends);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const dispatch = useDispatch();

  const medium = palette.neutral.medium;

    const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);
    
    const [data, setData] = useState([])
    const [order, setOrder] = useState("ASC")
    const [searchTerm, setsearchTerm] = useState("");

    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setData(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setData(sorted);
            setOrder("ASC");
         }
     }

    return (
        <div><Navbar/><WidgetWrapper><input type='text'
                    placeholder='Search Friends...'
                    className='form-control'
                    style={{ marginTop: 50, marginBottom: 20, width: '100%' }}
                    onChange={(e) => {
                        setsearchTerm(e.target.value);
            }} />
            <Box onClick={() => sorting("firstName, lastName, location")} style={{ color: 'white' }}></Box>
            
            {data?.filter((val) => {
                if (searchTerm === "") {
                    return val;
                } else if (
                    val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    val.location.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    return val;
                }
            }).map((i) => {
              return (
                  <div > 
                  <UserBackground> <div style={{ width: '100%' }}>
                    <UserImage2 image={i.picturePath}> </UserImage2>
                    <Box gap="1rem" mb="0.5rem" />  <div className='text2'>{i.firstName}&nbsp;{i.lastName} </div><FlexBetween />
                    <h8 className='text'  style={{ color: '#00d5fa' }}>{i.location}&nbsp;</h8></div>
                </UserBackground></div>
              )
            })}
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper></div>
  );
};

export default FriendsPage;