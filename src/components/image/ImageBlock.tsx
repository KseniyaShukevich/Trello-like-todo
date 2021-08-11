import React from "react";
import { makeStyles } from '@material-ui/core';
import ImageClass from './IImage';
import CloseIcon from '@material-ui/icons/Close';
import CircleButton from "../../utils/CircleButton";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteImage } from "../../slices/bufferTodoSlice";
import PreviewImage from './PreviewImage';

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
  mainImage: {
    color: theme.palette.primary.main,
    display: 'inline',
    marginLeft: theme.spacing(1),
  },
}));

interface IProps {
  isMain: boolean,
  image: ImageClass,
}

const Image: React.FC<IProps> = ({
  isMain,
  image,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteImage(image.url));
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
          <Typography
            style={{
              display: isMain ? 'inline' : '',
            }}
          >
            {image.originalFilename}.
            {image.format}
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
