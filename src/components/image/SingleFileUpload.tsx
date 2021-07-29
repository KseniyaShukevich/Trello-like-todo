import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CircleButton from "../../utils/CircleButton";
import { useSelector, useDispatch } from 'react-redux';
import { addImage, deleteImage } from "../../slices/bufferTodoSlice";
import cloudinary from 'cloudinary';

const useStyles = makeStyles((theme) => ({
  loader: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
  containerImage: {
    position: 'relative',
    paddingRight: theme.spacing(4),
    display: 'flex',
  },
  image: {
    height: '70px',
    width: '100px',
    marginBottom: theme.spacing(1),
  },
  info: {
    padding: theme.spacing(1),
  },
}));

interface IProps {
  file: File,
  onDelete: (file: File) => void,
}

const requestToCloudinary = async (formData: FormData): Promise<any> => {
  const cloudName = 'dshffjhdkjj';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(url, {
      method: "POST",
      body: formData
    });

  return await response.json();
}

const uploadImage = async (file: File) => {
  const formData = new FormData();
  let data;

  if (file) {
    const upload_preset = 'tr2sriht';
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    data = await requestToCloudinary(formData);
  }

  return data;
}

const SingleFileUploadWithProgress: React.FC<IProps> = ({
  file,
  onDelete,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState(null);
  // const [data, setData] = useState(null);

  const showImage = () => {
    const reader = new FileReader();

    reader.addEventListener('loadend', (e) => {
      setImageUrl((e.target as any).result);
    });
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    // cloudinary.v2.config({ 
    //   cloud_name: 'dshffjhdkjj', 
    //   api_key: '861619858212283', 
    //   api_secret: 'U5PkJU40PDsiCt8_YSF1lJPukoQ', 
    // });

    // cloudinary.v2.uploader.destroy('trello-todo/usssyzcw6jzz6eznzpsh', function(error, result) { console.log(result) });

    const upload = async () => {
    showImage()
    setIsLoader(true);
    const data = await uploadImage(file);
    // setData(data);
    setIsLoader(false);
    console.log(file);
    console.log(data);
    }

    upload();
  }, []);

  return (
    isLoader ? (
      <CircularProgress 
        className={classes.loader}
      />
    ) : (
      <div className={classes.containerImage}>
        <div
          className={classes.image}
          style={{
            background: `url("${imageUrl}") center center / cover`,
          }}
        />

        <div className={classes.info}>
          <Typography>
            {file.name}
          </Typography>
          <Typography>
            {moment().format('YYYY-MM-DD, HH:MM')}
          </Typography>
          <CircleButton 
            Child={CloseIcon}
            onClick={() => onDelete(file)}
          />
        </div>
        
      </div>
    )
  )
}

export default SingleFileUploadWithProgress;
