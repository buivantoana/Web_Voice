import React, { useEffect, useState } from "react";
import MaterialVideoView from "./MaterialVideoView";
import { Box, Dialog, DialogContent } from "@mui/material";
import { RiCloseLine } from "react-icons/ri";
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

type Props = {};

const MaterialVideoController = (props: Props) => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product_id");
  const [typeVoice, setTypeVoice] = useState("openai");
  const [openAuthor, setOpenAuthor] = React.useState(false);
  const [voicesFavorite, setVoicesFavorite]: any = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voices, setVoices] = useState<any>([]);
  const [voice, setVoice] = useState<any>({});
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage]: any = useState([]);
  const context: any = useCoursesContext();

  const [myVoices, setMyVoices] = useState<any>([]);
  const handleClickOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  useEffect(() => {
    if (productId) {
      if (Object.keys(context.state.user).length > 0) {
        (async () => {
          try {
            let data = await fetch(
              "https://vp.zeezoo.mobi:8089/product/get/info",
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  user_id: context.state.user && context.state.user.user_id,
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
                setProductUrl(result.product.product_url);
              }
              if (result.product.title) {
                setProductName(result.product.title);
              }
              if (result.product.images) {
                console.log(result.product.images);
                console.log(result.product.videos);
                setProductImage([
                  ...result.product.images,
                  ...result.product.videos,
                ]);
              }
            } else {
              toast.warning("Error");
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
  }, [productId]);
  useEffect(() => {
    loadVoicesOpenai();
  }, []);
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
  return (
    <>
      <MaterialVideoView handleClickOpenAuthor={handleClickOpenAuthor} />;
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
    </>
  );
};

export default MaterialVideoController;
