import { Box, Typography } from "@mui/material";
import React from "react";
import { RiUploadCloudFill } from "react-icons/ri";

type Props = {};

const DocumentView = (props: Props) => {
  return (
    <Box p={"20px"}>
      {" "}
      <Box sx={{ width: "100%" }}>
        <Box
          className='container'
          style={{
            width: "100%",
          }}>
          <Box
            sx={{
              border: "2px dashed rgb(226 232 240)",
              width: "100%",

              color: " #ff5117",
              fontSize: "22px",
              position: "relative",
              borderRadius: "6px",
              overflow: "hidden",
              py: { xs: "30px", md: "50px" },
            }}>
            <label
              htmlFor='input-img'
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              className='preview'>
              <RiUploadCloudFill color={"rgb(148 163 184)"} size={"37px"} />
              <Typography mt={"5px"} color='grey_500.main' fontSize={"16px"}>
                Nhấp để tải lên
              </Typography>
              <Typography
                textAlign={"center"}
                mt={"5px"}
                color='grey_500.main'
                fontSize={"14px"}>
                .docx , .xlsx , .pptx , .pdf , .epub , .mobi , .txt , .html ,
                .odt , .ods , .odp , .azw , .azw3
              </Typography>
            </label>
          </Box>

          <input
            // onChange={handleImageChange}
            type='file'
            hidden
            id='input-img'
          />
        </Box>
      </Box>
      <Box mt={"20px"}>
        <Typography fontSize={{ xs: ".8rem", md: "1rem" }} color='active.main'>
          Sau khi tệp được tải lên, chúng tôi sẽ bắt đầu tạo bài phát biểu của
          bạn. Điều này có thể mất vài phút.
        </Typography>
        <Box ml={"5%"}>
          <ul>
            <li>
              <Typography
                fontSize={{ xs: ".8rem", md: "1rem" }}
                sx={{ listStyle: "outside" }}>
                Bạn sẽ nhận được một email với một liên kết để tải xuống tệp
                tin.
              </Typography>
            </li>
            <li>
              <Typography fontSize={{ xs: ".8rem", md: "1rem" }}>
                Hoặc bạn có thể tải tệp trực tiếp từ Lịch sử.
              </Typography>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentView;
