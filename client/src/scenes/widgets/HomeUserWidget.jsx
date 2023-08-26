import {
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeUserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [modalOpened, setModalOpened] = useState(false)

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    city,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography onClick={() => navigate(`/profile/${userId}`)}
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
              {/* <img width="15px"
          height="15px" src="../assets/BB2.png" alt="linkedin" /> */}
            </Typography>
            <Typography gap="1rem" color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <Typography color={medium}> </Typography>
        <EditOutlined onClick={() => navigate("/edit-profile")} data={user} />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Profile Views</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
      <Typography color={medium}> (DESCRIPTION HERE) If you know me, you know I like to draw ✍🏽,
        Dragonball Z 🟠, Star Wars ⭐, FNAF 5️⃣, Pokemon ⚡ & the outdoors 🏕️. I have 2 siblings & a lot
        of cousins. Straight outta Mumbai! Don't be a stranger. Remember, if you
          can't grow here, you can't grow anywhere!</Typography></FlexBetween></Box>
      <Divider/>
      {/* FOURTH ROW */}
      <Box p="1rem 0">
        

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box p="1rem 0">
              <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                Social Profiles <Box/>
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>@john.smith</Typography>
            </Box>
          </FlexBetween>
          <img src="../assets/twitterblue.png" alt="twitter" />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box>
              <Typography color={main} fontWeight="500">
                Youtube
              </Typography>
              <Typography color={medium}>John Smith TV</Typography>
            </Box>
          </FlexBetween>
          <img src="../assets/ytubered.png" alt="linkedin" />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box>
              <Typography color={main} fontWeight="500">
                Facebook
              </Typography>
              <Typography color={medium}>John Smith</Typography>
            </Box>
          </FlexBetween>
          <img src="../assets/facebookblue.png" alt="twitter" />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box>
              <Typography color={main} fontWeight="500">
                Instagram
              </Typography>
              <Typography color={medium}>@john.smith</Typography>
            </Box>
          </FlexBetween>
          <img src="../assets/instagramorange.png" alt="linkedin" />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box>
              <Typography color={main} fontWeight="500">
                TikTok
              </Typography>
              <Typography color={medium}>@john.smith</Typography>
            </Box>
          </FlexBetween>
          <img src="../assets/tiktokaqua.png" alt="twitter" />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box>
              <Typography color={main} fontWeight="500">
                Snapchat
              </Typography>
              <Typography color={medium}>@john.smith</Typography>
            </Box>
          </FlexBetween>
          <img src="../assets/snapyellow.png" alt="twitter" />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box>
              <Typography color={main} fontWeight="500">
                Twitch
              </Typography>
              <Typography color={medium}>John Smith TV</Typography>
            </Box>
          </FlexBetween>
          <img src="../assets/twitchpurp.png" alt="linkedin" />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Box>
              <Typography color={main} fontWeight="500">
                Website
              </Typography>
              <Typography color={medium}>johnsmith.com</Typography>
            </Box>
          </FlexBetween>
          <img src="../assets/www.png" alt="linkedin" />
        </FlexBetween>

      </Box>
    </WidgetWrapper>
  );
};

export default HomeUserWidget;