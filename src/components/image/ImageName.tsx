import React from "react";
import { makeStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  mainImage: {
    color: theme.palette.primary.main,
    display: 'inline',
    marginLeft: theme.spacing(1),
  },
}));

interface IProps {
  isMain: boolean,
  fileName: string,
}

const ImageName: React.FC<IProps> = ({
  isMain,
  fileName,
}) => {
  const classes = useStyles();

  const getDisplayStyle = (): string => {
    return isMain ? 'inline' : '';
  }

  return (
    <>
      <Typography
        style={{
          display: getDisplayStyle(),
        }}
      >
        {fileName}
      </Typography>
      {
        isMain && (
          <Typography
            className={classes.mainImage}
          >
            Main
          </Typography>
        )
      }
    </>
  )
}

export default ImageName;
