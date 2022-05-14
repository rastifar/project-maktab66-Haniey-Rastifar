import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      
      <Grid
        container
        fullwidth
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh",background:"lightGray" }}
      >
        <Grid item>          
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
