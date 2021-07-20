import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle  from "@material-ui/core/DialogTitle";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import Image from './image';
import Sliders from './Sliders';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../../slices/Themeslice';
import CONSTANTS from '../../../CONSTANTS';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  button: {
    margin: theme.spacing(1),
    width: '70%',
    marginBottom: theme.spacing(6),
  },
  title: {
    textAlign: 'center',
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
}

const DialogThemes: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [imageId, setImageId] = useState<number>(1);
  const [images, setImages] = useState<Array<Image>>([]);
  const maxImageId = 4;

  const nextImage = (): void => {
    if (imageId < maxImageId) {  
      setImageId((prev) => prev + 1);
    } else {
      setImageId(0);
    }
  }

  const previousImage = (): void => {
    if (imageId < 1) {
      setImageId(maxImageId);
    } else {
      setImageId((prev) => prev - 1);
    }
  }

  const saveTheme = () => {
    dispatch(setTheme(imageId));
    localStorage.setItem(`${CONSTANTS.ID_LOCAL_STORAGE}theme`, imageId.toString());
  }

  useEffect(() => {
    images.forEach((el: Image) => {
      if (el.id === imageId) {
        el.active = true;
      } else {
        el.active = false;
      }
    });

    setImages([...images]);
  }, [imageId]);

  useEffect(() => {
    const result: Array<Image> = [];
    for (let i = 0; i <= maxImageId; i++) {
      const image: Image = new Image(i, `url(./background${i}.jpg)`, false);
      result.push(image);
    }

    result[0].active = true;
    setImages(result);
  }, []);

  return (
    <Dialog 
      onClose={() => setIsOpen(false)} 
      aria-labelledby="simple-dialog-title" 
      open={isOpen}
    >
      <IconButton 
        className={classes.closeButton}
        onClick={() => setIsOpen(false)}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle 
        id="simple-dialog-title"
        className={classes.title}
      >
        Themes
      </DialogTitle>

      <div className={classes.container}>
        <Sliders 
          images={images}
          previousImage={previousImage}
          nextImage={nextImage}
        />
        <Button 
          className={classes.button} 
          variant='outlined' 
          color='primary'
          onClick={saveTheme}
        >
          Save
        </Button>
      </div>

    </Dialog>
  )
};

export default DialogThemes;
