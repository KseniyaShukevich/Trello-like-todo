import React, { useState } from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import CircleButton from "../../../utils/CircleButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  containerData: {
    width: '300px',
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
  propDate: Date | null,
  text: string,
  className?: any,
}

const StartDate: React.FC<IProps> = ({
  propDate,
  text,
  className,
}) => {
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(propDate ? propDate : new Date());
  const [isDate, setIsDate] = useState<boolean>(!!propDate);

  const changeDate = (date: Date | null): void => {
    setDate(date);
  }

  const addDate = (): void => {
    setDate(new Date());
    setIsDate(true);
  }

  const deleteData = (): void => {
    setIsDate(false);
  }

  return (
    <>
      {
        isDate ? (
          <div className={classes.containerData}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={className}
                margin="normal"
                id="date-picker-dialog"
                label={text}
                format="MM/dd/yyyy"
                value={date}
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
        ) : (
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
    </>
  )
}

export default StartDate;
