import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from "@material-ui/core/Button";
import Image from './image';

const useStyles = makeStyles((theme) => ({
  sliders: {
    display: 'flex',
    justifyContent: 'center',
    width: '40vw',
    minWidth: '320px',
    maxWidth: '550px',
  },
  containerImage: {
    width: '70%',
    height: '200px',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  }
}));

interface IProps {
  images: Array<Image>,
  previousImage: () => void,
  nextImage: () => void,
}

const Sliders: React.FC<IProps> = ({
  images,
  previousImage,
  nextImage,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.sliders}>
      <Button onClick={previousImage}>
        <NavigateBeforeIcon fontSize='large' />
      </Button>

      <div className={classes.containerImage}>
        {
         images.map((image: Image, index: number) => {
            return (
              <div 
                key={index}
                className={classes.image}
                style={{
                  background: `url(./background${index}.jpg) center center / cover`,
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
  )
}

export default Sliders;