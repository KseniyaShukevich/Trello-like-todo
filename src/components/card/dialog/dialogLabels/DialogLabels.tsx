import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../../../utils/DialogLayout';
import ButtonLabel from './ButtonLabel';
import LabelBlock from './LabelBlock';
import { Label } from "../../../../utils/labels";

const useStyles = makeStyles(() => ({
  containerLabel: {
    display: 'flex',
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  labels: Array<Label>,
  setLabels: (value: Array<Label>) => void,
}

const DialogLabels: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  labels, 
  setLabels,
}) => {
  const classes = useStyles();
  const [editLabel, setEditLabel] = useState<string>('');

  return (
    <DialogLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={'Labels'}
    >
      <>
        {
          labels.map((label) => (
            <div key={label.id} className={classes.containerLabel}>
              <LabelBlock 
                label={label}
                editLabel={editLabel}
              />
              <ButtonLabel 
                label={label}
                editLabel={editLabel}
                setEditLabel={setEditLabel}
              />
            </div>
          ))
        }
      </>
    </DialogLayout>
  )
}

export default DialogLabels;
