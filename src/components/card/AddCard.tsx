import React, { useState } from "react";
import AddButton from '../../utils/AddButton';
import DialogCard from './dialog/DialogCard';

interface IProps {
  listId: string,
}

const AddCard: React.FC<IProps> = ({
  listId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <AddButton 
        onClick={() => setIsOpen(true)}
        text={'Add card'}
      />
      <DialogCard 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        textButton={'Create card'}
        listId={listId}
      />
    </>
  )
}

export default AddCard;
