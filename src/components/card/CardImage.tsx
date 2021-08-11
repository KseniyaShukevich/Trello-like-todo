import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  image: {
    height: 130,
  },
}))

interface IProps {
  url: string,
}

const CardImage: React.FC<IProps> = ({
  url,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.image}
      style={{
        background: `url(${url}) center center / cover`,
      }}
    />
  )
}

export default CardImage;
