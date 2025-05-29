/** @format */

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import headerImage from "../assets/task-header.webp"; // You'll need to add this image

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), url(${headerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 200,
        justifyContent: "center",
      }}
    >
      <Toolbar>
        <Box textAlign="center" width="100%">
          <Typography
            variant="h3"
            component="h1"
            color="white"
            fontWeight="bold"
          >
            Task Management Dashboard
          </Typography>
          <Typography variant="subtitle1" color="rgba(255,255,255,0.8)">
            Organize your work efficiently
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
