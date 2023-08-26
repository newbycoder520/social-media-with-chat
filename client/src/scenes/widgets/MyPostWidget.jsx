import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import "./MyPostWidget.css";
import VideocamIcon from '@mui/icons-material/Videocam';
import VideoPost2 from "components/VideoUpload/VideoUploader";




const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [youtubeVideo, setYoutubeVideo] = useState('');
    // for submit event
    const [youtubeURL, setYoutubeURL] = useState('');
    // for error msg
  const [youtubeError, setYoutubeError] = useState('');
  
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  const handleYoutubeChange = (e) => {
        setYoutubeVideo(e.target.value);
    }

    const handleYoutubeSubmit = (e) => {
        e.preventDefault();
        const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        if (youtubeRegex.test(youtubeVideo)) {
            setYoutubeURL(youtubeVideo);
            setYoutubeError('');
        }
        else {
            setYoutubeError('Invalid youtube URL');
        }
    }
  return (
    <WidgetWrapper>
      <FlexBetween gap=".5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Thoughts..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
          <Box
          borderRadius="3px"
          mt=".3rem"
        ><VideoPost2/>
           </Box>
        </Box>
       
      )}
<Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>Image</Typography>
           
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
              <VideocamIcon sx={{ color: mediumMain }} />
              <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>Video</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
        
      </FlexBetween>{image && (
          <div className="previewImage"><Divider sx={{ margin: ".5rem 0" }} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      
    
  
    </WidgetWrapper>
  );
};

export default MyPostWidget;