import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import colors from '../../../utils/colors';

const useStyles = makeStyles((theme) => ({
  containerCardColor: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  cardColorTitle: {
    marginRight: theme.spacing(1),
  },
  colorBlock: {
    width: '30px', 
    height: '30px', 
    opacity: 0.6,
    transition: '0.5s',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.8,
    }
  },
}));

const CardColor: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.containerCardColor}>

      <Typography 
        className={classes.cardColorTitle}
        variant='body1'
      >
        Card color:
      </Typography>

      {
        colors.map((color) => (
            <div 
              key={color}
              className={classes.colorBlock}
              style={{
                background: color,
              }}
            />
        ))
      }

    </div>
  )
}

export default CardColor;
