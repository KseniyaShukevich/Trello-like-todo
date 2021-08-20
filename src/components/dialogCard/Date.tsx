import React, { useState } from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import CircleButton from "../../utils/CircleButton";
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  containerData: {
    width: 300,
    position: 'relative',
  },
  containerAddButton: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

interface IProps {
  text: string,
  className?: string,
  bufferDate: string,
  setBufferDate: (value: string) => void,
}

const StartDate: React.FC<IProps> = ({
  text,
  className,
  bufferDate,
  setBufferDate,
}) => {
  const classes = useStyles();
  const [isDate, setIsDate] = useState<boolean>(!!bufferDate);

  const changeDate = (date: Date | null): void => {
    if (date) {
      setBufferDate(moment(date).format('YYYY-MM-DD'));
    }
  }

  const addDate = (): void => {
    setBufferDate(moment().format('YYYY-MM-DD'));
    setIsDate(true);
  }

  const deleteData = (): void => {
    setBufferDate('');
    setIsDate(false);
  }

  if (isDate) {
    return (
      <div className={classes.containerData}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={className}
            margin="normal"
            id="date-picker-dialog"
            label={text}
            format="MM/dd/yyyy"
            value={bufferDate}
            onChange={changeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <CircleButton
          Child={CloseIcon}
          onClick={deleteData}
        />
      </div>
    )
  }

  return (
    <div className={classes.containerAddButton}>
      <Typography variant='body1'>
        Add {text.toLowerCase()}
      </Typography>
      <IconButton
        className={classes.button}
        onClick={addDate}
      >
        <AddIcon />
      </IconButton>
    </div>
  )
}

export default StartDate;
