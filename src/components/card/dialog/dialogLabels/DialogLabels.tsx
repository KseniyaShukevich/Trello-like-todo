import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../../../utils/DialogLayout';
import ButtonLabel from './ButtonLabel';
import LabelBlock from './LabelBlock';
import { Label } from "../../../../utils/labels";
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo } from "../../../../slices/bufferTodoSlice";

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
  const labels = useSelector(selectBufferTodo)?.labels;
  const [editLabel, setEditLabel] = useState<string>('');
  const [textLabel, setTextLabel] = useState<string>('');

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={onClose}
      title={'Labels'}
    >
      <>
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
                setEditLabel={setEditLabel}
                setTextLabel={setTextLabel}
                textLabel={textLabel}
              />
            </div>
          ))
        }
      </>
    </DialogLayout>
  )
}

export default DialogLabels;
