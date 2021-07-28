import React, { useEffect } from "react";
import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  placeCard: {
    transition: '0.3s',
    width: '298px',
    height: '0px',
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.7)}`,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(1),
    background: alpha(theme.palette.secondary.main, 0.5),
    marginBottom: theme.spacing(1),
  },
}))

interface IProps {
  height: string,
}

const PlaceCard: React.FC<IProps> = ({
  height,
}) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(height);
  }, []);

  return (
    <div 
      className={classes.placeCard} 
      style={{
        height: `calc(${height} - 2px)`,
        borderWidth: height !== '0px' ? '1px' : '0px',
      }}
    />
  );
}

export default PlaceCard;
