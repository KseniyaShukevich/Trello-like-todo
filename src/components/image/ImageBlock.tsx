import React from "react";
import { makeStyles } from '@material-ui/core';
import IImage from './IImage';
import CloseIcon from '@material-ui/icons/Close';
import CircleButton from "../../utils/CircleButton";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import PreviewImage from './PreviewImage';
import ImageName from './ImageName';

const useStyles = makeStyles((theme) => ({
  containerImage: {
    position: 'relative',
    marginBottom: theme.spacing(1),
    display: 'flex',
  },
  info: {
    width: 'calc(100% - 100px)',
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    textDecoration: 'none',
    color: theme.palette.text.primary,
    transition: '0.3s',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.secondary.main,
    }
  },
}));

interface IProps {
  isMain: boolean,
  image: IImage,
  setBufferImages: any,
}

const Image: React.FC<IProps> = ({
  isMain,
  image,
  setBufferImages,
}) => {
  const classes = useStyles();

  const onDelete = () => {
    setBufferImages((previousImages: any) => {
      return previousImages.filter((currentImage: any) => currentImage.url !== image.url);
    });
  }

  return (
      <div className={classes.containerImage}>
        <PreviewImage
          url={image.url}
        />
        <a
          className={classes.info}
          href={image.url}
          target='_blank'
          rel="noreferrer"
        >
          <ImageName
            isMain={isMain}
            fileName={`${image.originalFilename}.${image.format}`}
          />
          <Typography>
            {moment(image.createdAt).format('YYYY-MM-DD, HH:MM')}
          </Typography>
        </a>
        <CircleButton
          Child={CloseIcon}
          onClick={() => onDelete()}
        />
      </div>
  );
}

export default Image;
