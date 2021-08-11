import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CircleButton from "../../utils/CircleButton";
import { FileError } from "react-dropzone";
import PreviewImage from './PreviewImage';

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
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  info: {
    padding: theme.spacing(1),
  },
  mainImage: {
    color: theme.palette.primary.main,
    display: 'inline',
    marginLeft: theme.spacing(1),
  }
}));

interface IProps {
  isMain: boolean,
  file: File,
  errors: Array<FileError>,
  onDelete: (file: File) => void,
}

const SingleFileUploadWithProgress: React.FC<IProps> = ({
  isMain,
  file,
  errors,
  onDelete,
}) => {
  const classes = useStyles();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const showImage = () => {
    const reader = new FileReader();

    reader.addEventListener('loadend', (e) => {
      setImageUrl((e.target as any).result);
    });
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    const upload = async () => {
      setIsLoader(true);
      showImage();
      setIsLoader(false);
    }

    upload();
  }, []);

  return (
    isLoader ? (
      <div>
        <CircularProgress 
          className={classes.loader}
        />
      </div>
    ) : (
      <div className={classes.containerImage}>
        {
          !errors.length && (
            <PreviewImage
              url={imageUrl}
            />
          )
        }

        <div className={classes.info}>
          <Typography
            style={{
              display: isMain ? 'inline' : '',
            }}
          >
            {file.name}
          </Typography>
          {
            isMain && (
              <Typography
                className={classes.mainImage}
              >
                Main
              </Typography>
            )
          }
          {errors.map((error) => (
            <Typography key={error.message} color='error'>
              Error: {error.message}
            </Typography>
          ))}

          {
            !errors.length && (
              <Typography>
                {moment().format('YYYY-MM-DD, HH:MM')}
              </Typography>
            )
          }

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
