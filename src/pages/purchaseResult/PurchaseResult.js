import React, { useEffect } from "react";
//--------Material
import { Typography, Box, Grid} from "@mui/material";
//--------ReactRouter
import { useLocation, useSearchParams } from "react-router-dom";
//----------Image
import successImage from "../../assets/images/success.png";
import failureImage from "../../assets/images/failure.jpg";
//---------Redux
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
//----------Api
import api from "../../api/api";
import axios from "axios";
//----------Toast
import { toast } from "react-toastify";

import { BASE_URL, ORDERS, PRODUCTS } from "../../constants/apiConst";

const PurchageResult = () => {
 
  const location = useLocation();
  const dispatch = useDispatch();
  const order = JSON.parse(localStorage.getItem("orders"));
  console.log(order);
  const token = useSelector((state) => state.token);
  const cartData = useSelector((state) => state.cart.cartItems);
  const purchaseResult = location.search.split("=")[1];
  console.log(cartData);
  useEffect(() => {
    if (purchaseResult === "success" && cartData.length!==0 && order) {
      try {
        handleUpdateOrders();
        handleInventories();
        handlecartItems();
      } catch (error) {
        toast.error("خطایی روی داده است");
      }
    }
  }, []);

  const handleUpdateOrders = async () => {
   
    console.log(order);
    const result = await api.post(BASE_URL + ORDERS, order);
    //api.post(BASE_URL + ORDERS, order).then(res=>localStorage.removeItem('orders'))
  };
  const handleInventories = () => {
    const tempArray = [];
    cartData.map(async (item) => {
      const updatedMaxCount = Number(item.count) - item.quantity;
      const response = await api.patch(
        BASE_URL + PRODUCTS + `/${item.id}`,
        { count: updatedMaxCount },
        {
          headers: { token: token },
          "Content-Type": "application/json",
        }
      );
      console.log(response);
    });
  };
  const handlecartItems = () => {
    dispatch(clearCart());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 5 }}
    >
      <Typography sx={{ fontSize: "1.5rem", mb: 3 }}>نتیجه پرداخت</Typography>
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={12} sm={4} align={"center"}>
          <img
            src={purchaseResult === "success" ? successImage : failureImage}
            alt="sucess image"
            style={{ width: "100%", maxWidth: "150px", height: "auto", mb: 3 }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {purchaseResult === "success" ? (
            <Typography sx={{ my: 7, textAlign: "center" }}>
              با تشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با
              شما تماس گرفته خواهد شد
            </Typography>
          ) : (
            <Typography sx={{ my: 7, textAlign: "center" }}>
              پرداخت موفقیت آمیز نبود.سفارش شما در انتظار پرداخت است
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PurchageResult;
