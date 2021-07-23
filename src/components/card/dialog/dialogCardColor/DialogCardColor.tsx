import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../../../utils/DialogLayout';
import colors from '../../../../utils/colors';
// import ButtonLabel from './ButtonLabel';
import LabelBlock from '../dialogLabels/LabelBlock';
// import labels from "../../../../utils/labels";
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  colorBlock: {
    lineHeight: '30px',
    minHeight: '30px',
    transition: '0.5s',
    minWidth: '200px',
    width: '30vw',
    maxWidth: '500px',
    opacity: 0.7,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    color: theme.palette.primary.contrastText,
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.9,
    }
  },
  addedIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.3),
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  currentColor: string,
  setCurrentColor: (value: string) => void,
}

const DialogLabels: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  currentColor,
  setCurrentColor,
}) => {
  const classes = useStyles();

  const hundleChangeColor = (color: string): void => {
    setCurrentColor(color);
  }

  return (
    <DialogLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={'Card color'}
    >
      <>
        {
          colors.map((color) => (
            <div 
              className={classes.colorBlock} 
              key={color}
              style={{
                background: color,
              }}
              onClick={() => hundleChangeColor(color)}
            >
              {color}
              {
                currentColor === color && (
                  <DoneIcon 
                    className={classes.addedIcon}
                  />
                )
              }
            </div>
          ))
        }
      </>
    </DialogLayout>
  )
}

export default DialogLabels;
