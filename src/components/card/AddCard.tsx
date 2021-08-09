import React, { useState } from "react";
import AddButton from '../../utils/AddButton';
import DialogCard from '../dialogCard/DialogCard';
import Todo from "./Todo";
import { useDispatch } from 'react-redux';
import { setBufferTodo } from "../../slices/bufferTodoSlice";
import labels from '../../utils/labels';

interface IProps {
  idList: string,
}

const AddCard: React.FC<IProps> = ({
  idList,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hundleCreateCard = (): void => {
    const newTodo: Todo = new Todo(idList, '', labels.map((label) => label.clone()));
    
    dispatch(setBufferTodo(JSON.parse(JSON.stringify(newTodo))));
    setIsOpen(true);
  }

  return (
    <>
      <AddButton 
        onClick={hundleCreateCard}
        text={'Add card'}
      />
      <DialogCard 
        isNewCard={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        textButton={'Create card'}
        idList={idList}
      />
    </>
  )
}

export default AddCard;
