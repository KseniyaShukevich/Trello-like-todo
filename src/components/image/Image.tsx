import React from "react";
import { makeStyles } from '@material-ui/core';
import ImageClass from './image';
import CloseIcon from '@material-ui/icons/Close';
import CircleButton from "../../utils/CircleButton";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteImage } from "../../slices/bufferTodoSlice";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
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
  image: ImageClass,
}

const Image: React.FC<IProps> = ({
  image,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteImage(image.url));
  }
  
  return (
    <div className={classes.containerImage}>
        <div
          className={classes.image}
          style={{
            background: `url("${image.url}") center center / cover`,
          }}
        />

        <div className={classes.info}>
          <Typography>
            {image.originalFilename}.
            {image.format}
          </Typography>
          <Typography>
            {moment(image.createdAt).format('YYYY-MM-DD, HH:MM')}
          </Typography>

          <CircleButton 
            Child={CloseIcon}
            onClick={() => onDelete()}
          />
        </div>
        
      </div>
  );
}

export default Image;
