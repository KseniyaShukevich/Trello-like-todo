import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginRight: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  text: {
    wordWrap: 'break-word', 
  },
}))

interface IProps {
  title: string,
  text: string,
}

const CardText: React.FC<IProps> = ({
  title,
  text,
}) => {
  const classes = useStyles();

  const getFormattedText = (): string => {
    return text.length > 350 ? (text.slice(0, 350) + '...') : text;
  }

  return (
    <>
      <Typography 
        variant='subtitle1'
        className={classes.title}
      >
        {title}
      </Typography>
      {
        text && (
          <>
            <hr/>
            <Typography
              variant='body1'
              className={classes.text}
            >
              {
                getFormattedText()
              }
            </Typography>
          </>
        )
      }
    </>
  )
}

export default CardText;
