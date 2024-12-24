import React, { useEffect, useState } from "react";
import MaterialVideoView from "./MaterialVideoView";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { RiCloseCircleFill, RiCloseLine } from "react-icons/ri";
import Author from "../../components/Author";
import Loading from "../../components/Loading";
import {
  getMyVoices,
  getVoicesFavorite,
  getVoicesOpenAi,
} from "../../service/voice";
import { useCoursesContext } from "../../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import MaterialVideoRegenerateController from "./MaterialVideoRegenerateController";

type Props = {};

const MaterialVideoController = (props: Props) => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product_id");
  const [typeVoice, setTypeVoice] = useState("openai");
  const [openAuthor, setOpenAuthor] = React.useState(false);
  const [openUrlImage, setOpenUrlImage] = React.useState(false);
  const [voicesFavorite, setVoicesFavorite]: any = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voices, setVoices] = useState<any>([]);
  const [voice, setVoice] = useState<any>({});
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productUrlOld, setProductUrlOld] = useState(null);
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage]: any = useState([]);
  const [productVideo, setProductVideo]: any = useState([]);
  const [productVideoUrl, setProductVideoUrl]: any = useState([]);
  const context: any = useCoursesContext();
  const theme: any = useTheme();
  const [myVoices, setMyVoices] = useState<any>([]);
  const [selectedUrls, setSelectedUrls]: any = useState([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const handleCheckboxChange = (url: string) => {
    setSelectedUrls((prev: any) =>
      prev.includes(url)
        ? prev.filter((item: any) => item !== url)
        : [...prev, url]
    );
  };
  const handleClickOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  useEffect(() => {
    if (productId) {
      (async () => {
        try {
          let data = await fetch(
            "https://vp.zeezoo.mobi:8089/product/get/info",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization:
                  "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
              },
              body: JSON.stringify({
                user_id: "0399524219",
                product_id: productId,
              }),
            }
          );
          let result = await data.json();
          if (Object.keys(result.product).length > 0) {
            if (result.product.summary) {
              setProductDesc(result.product.summary);
            }
            if (result.product.product_url) {
              setProductUrlOld(result.product.product_url);
              setProductUrl(result.product.product_url);
            }
            if (result.product.title) {
              setProductName(result.product.title);
            }
            if (result.product.images.length > 0) {
              console.log(result.product.images);
              console.log(result.product.videos);
              setOpenUrlImage(true);
              setProductImage([
                ...JSON.parse(result.product.images[0]).filter(
                  (item: any) => item != ""
                ),
              ]);
              setProductVideoUrl(
                JSON.parse(result.product.videos[0]).filter(
                  (item: any) => item != ""
                )
              );
            }
          } else {
            toast.warning("Error");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [productId]);
  console.log(productImage);
  useEffect(() => {
    loadVoicesOpenai();
    (async () => {
      try {
        let data = await fetch("https://vp.zeezoo.mobi:8089/product/samples", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
          },
        });
        let result = await data.json();
        if (result.videos && result.videos.length > 0) {
          setProductVideo(result.videos);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(productVideo);
  useEffect(() => {
    loadMyVoices();
    loadVoicesFavorite();
    if (Object.keys(context.state.user).length == 0) {
      setVoicesFavorite([]);
      setMyVoices([]);
    }
  }, [context.state.user]);
  useEffect(() => {
    if (myVoices.length > 0) {
      setVoicesFavorite([
        ...voicesFavorite,
        ...myVoices
          .filter((item: any) => item.favorite == true)
          .map((item: any) => item.voice_id),
      ]);
    }
  }, [myVoices]);
  const loadVoicesFavorite = async () => {
    setLoadingVoices(true);
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let data = await getVoicesFavorite({
          user_id: context.state.user.user_id,
        });
        console.log("AAAA data", data);
        if (data.voices && data.voices.length > 0) {
          data.voices = data.voices.filter(
            (item: any) => item.favorite == true
          );
          console.log(data.voices.map((item: any) => item.id));
          setVoicesFavorite(data.voices.map((item: any) => item.id));
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  const loadMyVoices = async (check_type = false) => {
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let data = await getMyVoices(context.state.user.user_id);
        console.log("AAAA data", data);
        if (data.my_voices && data.my_voices.length > 0) {
          setMyVoices(
            data.my_voices.map((item: any) => {
              return {
                ...item,
                type: "my_voice",
                id: item.voice_id,
                name: item.voice_name,
                description: item.voice_desc,
                voice: item.voice_name,
              };
            })
          );
        }
        if (check_type) {
          setTypeVoice("my_voices");
          if (data.my_voices.length == 0) {
            setMyVoices([]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(voicesFavorite);
  console.log(voices);
  const loadVoicesOpenai = async () => {
    setLoadingVoices(true);
    try {
      let data = await getVoicesOpenAi();
      console.log("AAAA data", data);
      if (data.voices && data.voices.length > 0) {
        if (!(Object.keys(context.state.history).length > 0)) {
          setVoice(data.voices[0]);
        }

        setVoices(data.voices);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  const handleSelectImage = async () => {
    try {
      if (selectedUrls.length > 0) {
        const promises = selectedUrls.map((url: any) =>
          handleAddLinkAsFile(url)
        );
        await Promise.all(promises); // Chờ tất cả ảnh được tải
        setOpenUrlImage(false);
      }
    } catch (error) {
      console.log("Error in handleSelectImage:", error);
    }
  };

  const handleAddLinkAsFile = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Lấy tên file từ link hoặc đặt tên mặc định
      const fileName = url.split("/").pop() || "downloaded_file";
      const fileType = blob.type;

      // Tạo file từ blob
      const file = new File([blob], fileName, { type: fileType });

      // Cập nhật danh sách file và phần trăm tải về
      setFileList((prev) => {
        const updatedList = [...prev, file];
        setProgress((progress) => [...progress, 0]);
        simulateUpload(updatedList.length - 1); // Đảm bảo chỉ số chính xác
        return updatedList;
      });
    } catch (error) {
      console.error("Tải ảnh thất bại:", error);
    }
  };

  // Giả lập tiến trình upload
  const simulateUpload = (index: number) => {
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += Math.random() * 10;
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = Math.min(100, uploadProgress);
        return newProgress;
      });
      if (uploadProgress >= 100) clearInterval(interval);
    }, 500);
  };
  console.log(fileList);
  return (
    <>
      {/* <MaterialVideoView
        handleClickOpenAuthor={handleClickOpenAuthor}
        productName={productName}
        productUrl={productUrl}
        productDesc={productDesc}
        setProductUrl={setProductUrl}
        fileList={fileList}
        setFileList={setFileList}
        progress={progress}
        setProgress={setProgress}
        simulateUpload={simulateUpload}
        handleAddLinkAsFile={handleAddLinkAsFile}
        productUrlOld={productUrlOld}
        setOpenUrlImage={setOpenUrlImage}
        productVideo={productVideo}
      /> */}
      <MaterialVideoRegenerateController />;
      <Dialog
        fullWidth
        maxWidth='xl' // Đặt maxWidth lớn nhất để có thể sử dụng toàn bộ chiều rộng
        PaperProps={{
          sx: {
            width: "100%", // Chiều rộng 100%
            maxWidth: "100%",
            ".css-kw13he-MuiDialogContent-root": {
              padding: { xs: "0" },
            },
          },
        }}
        open={openAuthor}
        onClose={handleCloseAuthor}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <Box
          display={"flex"}
          onClick={handleCloseAuthor}
          justifyContent={"end"}>
          <RiCloseLine size={25} />
        </Box>
        <DialogContent>
          {!loadingVoices ? (
            <Author
              setVoice={setVoice}
              voice={voice}
              data={voices}
              type={"story"}
              voicesFavorite={voicesFavorite}
              setVoicesFavorite={setVoicesFavorite}
              myVoices={myVoices}
              typeVoice={typeVoice}
              setTypeVoice={setTypeVoice}
            />
          ) : (
            <Loading height={"100%"} />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        sx={{ cursor: "pointer" }}
        maxWidth={"md"}
        fullWidth={true}
        open={openUrlImage}
        onClose={() => setOpenUrlImage(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <Box
            width={"100%"}
            display={"flex"}
            onClick={() => setOpenUrlImage(false)}
            justifyContent={"end"}>
            <RiCloseCircleFill size={25} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box textAlign={"center"} mb={"20px"}>
            <Typography fontWeight={"bold"} fontSize={"1.6rem"}>
              Select the materials to use
            </Typography>
            <Typography fontSize={".8rem"}>
              More materials mean a better video, but also longer processing
              time.
            </Typography>
          </Box>
          <Box display={"flex"} flexWrap={"wrap"} gap={"25px"}>
            {productImage.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  position='relative'
                  display='flex'
                  flexDirection='column'
                  justifyContent={"center"}
                  width={"150px"}
                  height={"150px"}
                  bgcolor={"rgba(0,0,0,.1)"}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                  alignItems='center'>
                  <img
                    src={item}
                    width={"100px"}
                    height={"100px"}
                    style={{ borderRadius: "20px", objectFit: "contain" }}
                    alt=''
                  />
                  <Checkbox
                    checked={selectedUrls.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "black",
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                  />
                </Box>
              );
            })}
            {productVideoUrl.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  position='relative'
                  display='flex'
                  flexDirection='column'
                  justifyContent={"center"}
                  width={"150px"}
                  height={"150px"}
                  bgcolor={"rgba(0,0,0,.1)"}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                  alignItems='center'>
                  <video
                    src={item}
                    width='100'
                    height='100'
                    style={{ borderRadius: "20px", objectFit: "contain" }}
                    controls
                  />
                  <Checkbox
                    checked={selectedUrls.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "black",
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSelectImage}
            disabled={!selectedUrls.length > 0}
            variant='contained'
            sx={{ background: theme.palette.active.main, borderRadius: "8px" }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MaterialVideoController;
