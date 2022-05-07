import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Tab,
  Tabs,
  useTheme,
  Badge,
  useMediaQuery,
} from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { LINKARRAYS } from "../../../constants/layoutConsts"

import DrawerComp from "./DrawerComp";

import image1 from "../../../assets/images/logo22.png";
import image2 from "../../../assets/images/logo1.png";

const pages = ["فروشگاه", "تماس با ما", "درباره ما", "مدیریت"];

const Header = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        {isMatch ? (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <img src={image2} style={{ width: "60px" }} />
            </Box>
            <Box>
              <Badge badgeContent={0} color="error">
                <AddShoppingCart />
              </Badge>
            </Box>
            <DrawerComp />
          </>
        ) : (
          <>
            <Box>
              <img src={image1} style={{ width: "200px" }} />
            </Box>
            <Box sx={{ flexGrow: 1, marginRight: "5rem" }}>
              <Tabs
                indicatorColor="secondary"
                value={value}
                textColor="primary"
                onChange={(e, val) => setValue(val)}
              >
                {LINKARRAYS.map((link, index) => (
                  <Tab
                    label={link}
                    key={index}
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ margin: "1rem" }}>
              <Button color="warning" size="medium" variant="contained">
                مدیریت
              </Button>
            </Box>
            <Box>
              <Badge badgeContent={0} color="error">
                <AddShoppingCart />
              </Badge>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;