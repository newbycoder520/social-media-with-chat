import React, { useEffect, useState } from "react";
import FollowersModal from "./FollowersModal";
import { useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import './UsersPage.css'
import Navbar from '../../scenes/navbar/index'
import FlexBetween from "components/FlexBetween";
import UserImage2 from "components/UserImage2";
import UserBackground from "components/UserBackground";

const UsersPage = ({ userId, friendId }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const friends = useSelector((state) => state.user.friends);
    const token = useSelector((state) => state.token);
     const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const { _id } = useSelector((state) => state.user);

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  
  const isFriend = Object.values(friends).find((friend) => friend._id === friendId);

    const [data, setData] = useState([])
    const [order, setOrder] = useState("ASC")
    const [searchTerm, setsearchTerm] = useState("");
  useEffect(() => {
    fetch(`http://localhost:3001/getAllUser`, {
      method: "GET",
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, "User");
        setData(data.data);
      })
    },[])
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
        <div><Navbar/><WidgetWrapper>
            
    <Typography className="FollowersCard"></Typography>
      <h3>BRIDGE</h3>
            
                <input type='text'
                    placeholder='Bridge...'
                    className='form-control'
                    style={{ marginTop: 50, marginBottom: 20, width: '100%' }}
                    onChange={(e) => {
                        setsearchTerm(e.target.value);
                }}/>
                    <WidgetWrapper className='widget'/><Box  display="flex" flexWrap='wrap' flexDirection="row" gap="3.5rem" >
                        <Box style={{ color: 'white' }}></Box>
              <Box onClick={()=>sorting("firstName, lastName, location")} style={{ color: 'white' }}></Box>
            
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
                  <div className='text3'> 
                  <UserBackground> <div style={{ width: '100%' }}>
                    <UserImage2 image={i.picturePath}> </UserImage2>
                    <Box gap="1rem" mb="0.5rem" />  <div className='text2'>{i.firstName}&nbsp;{i.lastName} </div><FlexBetween />
                    <h8 className='text'  style={{ color: '#00d5fa' }}>{i.location}&nbsp;</h8></div>
                </UserBackground></div>
              )
            })}
      <Box display="flex" flexDirection="column" gap="1.5rem"></Box><FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      /><Typography textAlign="center" sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }} color="primary" onClick={() => setModalOpened(true)}> </Typography>
    </Box>
      </WidgetWrapper>
      <Box display="flex"  gap="1rem" mb="0.5rem"></Box>
      <Typography textAlign="center" sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }} color="primary" onClick={() => setModalOpened(true)}><h4>Instead of burning bridges, let's connect them!</h4> </Typography></div>
  );
};

export default UsersPage;