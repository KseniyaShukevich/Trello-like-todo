import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import DialogLabels from './DialogLabels';

const useStyles = makeStyles((theme) => ({
  labels: {
    marginTop: theme.spacing(2),
  },
  containerLabelsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  labelBlock: {
    lineHeight: '30px',
    minWidth: '30px',
    height: '30px',
    borderRadius: '4px',
    padding: theme.spacing(1),
    transition: '0.5s',
    opacity: 0.6,
    marginRight: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.8,
    }
  },
}));

const Labels: React.FC = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Typography 
        variant='body1'
        className={classes.labels}
      >
        Labels
      </Typography>

      <div className={classes.containerLabelsBlock}>
        {
          [{text: 'dssfd', color: 'red'}, {text: 'sssss', color: 'green'}, {text: '', color: 'pink'}].map((label, index) => (
            <div
              key={index}
              className={classes.labelBlock}
              style={{
                background: label.color,
              }}
              onClick={() => setIsOpen(true)}
            >
              {label.text}
            </div>
          ))
        }
        <IconButton
          onClick={() => setIsOpen(true)}
        >
          <AddIcon />
        </IconButton>
      </div>

      <DialogLabels 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default Labels;
