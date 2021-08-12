import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../utils/DialogLayout';
import ButtonLabel from './ButtonLabel';
import LabelBlock from './LabelBlock';
import { useSelector } from 'react-redux';
import { selectBufferTodo } from "../../slices/bufferTodoSlice";
import { DialogContent } from "@material-ui/core";
import { Label } from "../dialogCard/Label";

const useStyles = makeStyles(() => ({
  containerLabel: {
    display: 'flex',
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
}

const DialogLabels: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const classes = useStyles();
  const labels: Array<Label> | undefined = useSelector(selectBufferTodo)?.labels;
  const [editLabel, setEditLabel] = useState<string>('');
  const [textLabel, setTextLabel] = useState<string>('');

  const onClose = (): void => {
    setIsOpen(false);
    setEditLabel('');
    setTextLabel('');
  }

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={onClose}
      title={'Labels'}
    >
      <DialogContent>
        {
          labels && labels.map((label) => (
            <div key={label.id} className={classes.containerLabel}>
              <LabelBlock 
                label={label}
                editLabel={editLabel}
                textLabel={textLabel}
                setTextLabel={setTextLabel}
              />
              <ButtonLabel 
                label={label}
                editLabel={editLabel}
                textLabel={textLabel}
                setEditLabel={setEditLabel}
                setTextLabel={setTextLabel}
              />
            </div>
          ))
        }
      </DialogContent>
    </DialogLayout>
  )
}

export default DialogLabels;
