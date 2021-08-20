import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../utils/DialogLayout';
import ButtonLabel from './ButtonLabel';
import LabelBlock from './LabelBlock';
import { DialogContent } from "@material-ui/core";
import { Label } from "../dialogCard/Label";

const useStyles = makeStyles(() => ({
  containerLabel: {
    display: 'flex',
  },
}));

interface IProps {
  isOpen: boolean,
  bufferLabels: Array<Label>,
  setIsOpen: (value: boolean) => void,
  setBufferLabels: (value: Array<Label>) => void,
}

const DialogLabels: React.FC<IProps> = ({
  isOpen,
  bufferLabels,
  setIsOpen,
  setBufferLabels,
}) => {
  const classes = useStyles();
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
          bufferLabels.map((label) => (
            <div key={label.id} className={classes.containerLabel}>
              <LabelBlock
                label={label}
                editLabel={editLabel}
                textLabel={textLabel}
                setTextLabel={setTextLabel}
                setBufferLabels={setBufferLabels}
              />
              <ButtonLabel
                label={label}
                editLabel={editLabel}
                textLabel={textLabel}
                setEditLabel={setEditLabel}
                setTextLabel={setTextLabel}
                setBufferLabels={setBufferLabels}
              />
            </div>
          ))
        }
      </DialogContent>
    </DialogLayout>
  )
}

export default DialogLabels;
