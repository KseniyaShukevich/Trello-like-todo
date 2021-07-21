import React, { useState } from "react";
import AddButton from '../../utils/AddButton';
import DialogCard from './dialog/DialogCard';

const AddCard: React.FC = () => {
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
      />
    </>
  )
}

export default AddCard;
