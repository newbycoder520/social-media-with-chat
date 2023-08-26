import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import FollowersCard from "../FollowersCard/FollowersCard.jsx";
import { Typography } from "@mui/material";
import UsersPage from "./UsersPage.jsx";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  return (
    <Modal
      overlaycolor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlaycpacity={0.55}
      overlayblur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
<Typography> BRIDGE </Typography>
    <UsersPage location='modal'/>
    </Modal>
  );
};

export default FollowersModal;