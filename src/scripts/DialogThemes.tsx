import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle  from "@material-ui/core/DialogTitle";
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";

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
    width: '100%',
  },
  containerButtons: {
    margin: theme.spacing(1),
    width: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(6),
  },
  sliders: {
    display: 'flex',
    justifyContent: 'center',
    width: '40vw',
    minWidth: '320px',
    maxWidth: '550px',
  },
  title: {
    textAlign: 'center',
  },
  image: {
    width: '70%',
    height: '200px',
    position: 'relative',
  }
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
  const [image, setImage] = useState<number>(1);
  const countImages = 5;
  const [images, setImages] = useState<any>([]);

  const nextImage = () => {
    if (image < countImages) {
      
      setImage((prev) => prev + 1);
    } else {
     
      setImage(1);
    }
  }

  const previousImage = () => {
    if (image < 2) {
      setImage(countImages);
    } else {
      setImage((prev) => prev - 1);
    }
  }

  useEffect(() => {
    images.forEach((elem: any) => {
      if (elem.id === image - 1) {
        elem.active = true;
      } else {
        elem.active = false;
      }
    });
    setImages([...images]);
  }, [image]);

  useEffect(() => {
    const result = [];
    for (let i = 0; i < countImages; i++) {
      result.push({
        id: i,
        url: `url(./background${i}.jpg)`,
        active: false,
      });
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
        <div className={classes.sliders}>
          <Button onClick={previousImage}>
            <NavigateBeforeIcon fontSize='large' />
          </Button>


      

          <div className={classes.image}>
          {
           images.map((image: any, index: number) => {
            return (
              <div 
                key={index}
                style={{
                  background: `url(./background${index}.jpg) center center / cover`,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: `${image.active ? 1 : 0}`,
                  transition: '0.5s',
                }}
              />
            )
            })
          }
          </div>




          <Button onClick={nextImage}>
            <NavigateNextIcon fontSize='large' />
          </Button>
        </div>
        <div className={classes.containerButtons}>
          <Button 
            className={classes.button} 
            variant='outlined' 
            color='primary'
          >
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  )
};

export default DialogThemes;
