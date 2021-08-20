import React from "react";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  image: {
    height: 70,
    width: 100,
  },
}));

interface IProps {
  url: string,
}

const PreviewImage: React.FC<IProps> = ({
  url,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.image}
      style={{
        background: `url("${url}") center center / cover`,
      }}
    />
  )
}

export default PreviewImage;
