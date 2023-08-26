import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {

  
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "60%" }}
        width={size}
        height={size}
        alt={`http://localhost:3001/assets/bb2.png`}
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;