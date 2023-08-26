import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "./FollowersModal";
import { useSelector } from "react-redux";
import { Box, Typography,useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";

const FollowersCard = ({ }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const token = useSelector((state) => state.token);
  
  const { palette } = useTheme();

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
      <WidgetWrapper>
    <Typography className="FollowersCard"></Typography>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Bridge
      </Typography>
<WidgetWrapper/>
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
                  <div className='text'>
                  <td style={{ color: 'white' }}> <UserImage image={i.picturePath}> </UserImage>
                    {i.firstName} {i.lastName} <h6 style={{ color: '#00d5fa' }}>{i.location}</h6></td>
                </div>
              )
            })}
     
      
      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      /><Typography textAlign="center" sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }} color="primary" onClick={() => setModalOpened(true)}><h4>Show more</h4> </Typography>
 
    </WidgetWrapper>
  );
};

export default FollowersCard;