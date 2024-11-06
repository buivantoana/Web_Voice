import { useState } from "react";
import BuyCreditView from "./BuyCreditView";
import { Box, Dialog, DialogContent } from "@mui/material";
import { RiCloseLine } from "react-icons/ri";
import { createPayment } from "../../service/payment";
import { useCoursesContext } from "../../App";
import Loading from "../../components/Loading";

const BuyCreditController = () => {
  const [amount, setAmount] = useState(0.2);
  const [openQr, setOpenQr] = useState(false);
  const [codePayment, setCodePayment] = useState("");
  const [loading, setLoading] = useState(false);
  const context: any = useCoursesContext();
  const handleSliderChange = (event: any, newValue: any) => {
    // Cập nhật giá trị của Slider
    setAmount(newValue);
  };

  const handleCreatePayment = async () => {
    setLoading(true);
    try {
      let data = await createPayment({
        user_id: context.state.user.user_id,
        amount: amount * 1000000,
      });
      if (data.code == 0) {
        setCodePayment(data.data.code_payment);
        handleClickOpenQr();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleClickOpenQr = () => {
    setOpenQr(true);
  };

  const handleCloseQr = () => {
    setOpenQr(false);
  };

  return (
    <>
      {loading && <Loading position={"fixed"} />}
      <BuyCreditView
        amount={amount}
        setAmount={setAmount}
        handleSliderChange={handleSliderChange}
        handleClickOpenQr={handleClickOpenQr}
        handleCreatePayment={handleCreatePayment}
      />
      <Dialog
        maxWidth='xs' // sets a maximum width
        fullWidth
        open={openQr}
        onClose={handleCloseQr}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <Box display={"flex"} onClick={handleCloseQr} justifyContent={"end"}>
          <RiCloseLine size={25} />
        </Box>
        <DialogContent>
          <img
            src={`https://qr.limcorp.vn/qrcode.png?bank=970422&number=99192886868&amount=${
              amount < 1 ? amount * 1000000 : amount * 1000000
            }&content=${codePayment}`}
            alt='QR Code'
            width='100%'
            height='100%'
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyCreditController;
