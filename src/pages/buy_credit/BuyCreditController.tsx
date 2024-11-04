import { useState } from "react";
import BuyCreditView from "./BuyCreditView";
import { Box, Dialog, DialogContent } from "@mui/material";
import { RiCloseLine } from "react-icons/ri";

const BuyCreditController = () => {
  const [amount, setAmount] = useState(0.2);
  const [openQr, setOpenQr] = useState(false);
  const handleSliderChange = (event: any, newValue: any) => {
    // Cập nhật giá trị của Slider
    setAmount(newValue);
  };

  const handleClickOpenQr = () => {
    setOpenQr(true);
  };

  const handleCloseQr = () => {
    setOpenQr(false);
  };

  return (
    <>
      <BuyCreditView
        amount={amount}
        setAmount={setAmount}
        handleSliderChange={handleSliderChange}
        handleClickOpenQr={handleClickOpenQr}
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
            }&content=GMV%20WALLET5715`}
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
