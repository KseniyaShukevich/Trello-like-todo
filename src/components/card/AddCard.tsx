import React, { useState } from "react";
import AddButton from '../../utils/AddButton';
import DialogCard from '../dialogCard/DialogCard';
import Todo from "./Todo";
import labels from '../dialogCard/Label';

interface IProps {
  idList: string,
}

const AddCard: React.FC<IProps> = ({
  idList,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setIsOpen(true);
  }

  const createTodo = (): Todo => {
    return JSON.parse(JSON.stringify(new Todo(idList, '', labels.map((label) => label.clone()))));
  }

  return (
    <>
      <AddButton
        onClick={handleOpenDialog}
        text={'Add card'}
      />
      <DialogCard
        isNewCard={true}
        todo={createTodo()}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        textButton={'Create card'}
        idList={idList}
      />
    </>
  )
}

export default AddCard;
