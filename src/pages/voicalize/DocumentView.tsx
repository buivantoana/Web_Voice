import { Box, Typography } from "@mui/material";
import React from "react";
import { RiUploadCloudFill } from "react-icons/ri";

type Props = {};

const DocumentView = (props: Props) => {
  return (
    <Box p={"20px"}>
      {" "}
      <Box sx={{ width: "100%" }}>
        <div
          className='container'
          style={{
            width: "100%",
          }}>
          <label
            htmlFor='input-img'
            className='preview'
            style={{
              border: "2px dashed rgb(226 232 240)",
              width: "100%",
              height: "250px",
              color: " #ff5117",
              fontSize: "22px",
              position: "relative",
              borderRadius: "6px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              cursor: "pointer",
            }}>
            <RiUploadCloudFill color={"rgb(148 163 184)"} size={"37px"} />
            <Typography mt={"5px"} color='grey_500.main' fontSize={"16px"}>
              Nhấp để tải lên
            </Typography>
            <Typography mt={"5px"} color='grey_500.main' fontSize={"14px"}>
              .docx , .xlsx , .pptx , .pdf , .epub , .mobi , .txt , .html , .odt
              , .ods , .odp , .azw , .azw3
            </Typography>
          </label>
          <input
            // onChange={handleImageChange}
            type='file'
            hidden
            id='input-img'
          />
        </div>
      </Box>
      <Box mt={"20px"}>
        <Typography color='active.main'>
          Sau khi tệp được tải lên, chúng tôi sẽ bắt đầu tạo bài phát biểu của
          bạn. Điều này có thể mất vài phút.
        </Typography>
        <Box ml={"5%"}>
          <ul>
            <li>
              <Typography sx={{ listStyle: "outside" }}>
                Bạn sẽ nhận được một email với một liên kết để tải xuống tệp
                tin.
              </Typography>
            </li>
            <li>
              <Typography>
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
