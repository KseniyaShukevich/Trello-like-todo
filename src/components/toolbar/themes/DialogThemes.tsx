import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Image from './image';
import Sliders from './Sliders';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, selectTheme } from '../../../slices/themeslice';
import CONSTANTS from '../../../utils/CONSTANTS';
import DialogLayout from "../../../utils/DialogLayout";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40vw',
    minWidth: '320px',
    maxWidth: '550px',
  },
  button: {
    marginTop: theme.spacing(1),
    width: `calc(100% - 128px)`,
    minWidth: '192px',
    maxWidth: '422px',
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
  const theme: number = useSelector(selectTheme);
  const [imageId, setImageId] = useState<number>(theme);
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

  const onClose = () => {
    setIsOpen(false);
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

    result[imageId].active = true;
    setImages(result);
  }, []);

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={onClose}
      title={'Themes'}
    >
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
    </DialogLayout>
  )
};

export default DialogThemes;
