import React from "react";
import CardColor from './CardColor';
import Labels from './Labels';
import InputTitle from './InputTitle';
import InputText from './InputText';
import Dates from './Dates';
import DialogLayout from '../../../utils/DialogLayout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hr: {
    background: theme.palette.primary.main,
    width: '100%',
    height: '1px',
    // marginTop: theme.spacing(1),
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
}

const DialogCard: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const classes = useStyles();

  return (
    <DialogLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <CardColor />
      <div className={classes.hr} />
      <Labels />
      <div className={classes.hr} />
      <InputTitle />
      <InputText />
      <Dates />
    </DialogLayout>
  )
}

export default DialogCard;
