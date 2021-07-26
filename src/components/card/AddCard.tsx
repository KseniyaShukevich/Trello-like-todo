import React, { useState } from "react";
import AddButton from '../../utils/AddButton';
import DialogCard from './dialog/DialogCard';
import Todo from "../../utils/Todo";
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo, setBufferTodo } from "../../slices/bufferTodoSlice";
import labels, { Label } from '../../utils/labels';

interface IProps {
  listId: string,
}

const AddCard: React.FC<IProps> = ({
  listId,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hundleCreateCard = (): void => {
    // WHY???
    const newTodo: Todo = new Todo(listId, 'ffff', labels.map((label) => label.clone()));
    // console.log(newTodo);
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
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        textButton={'Create card'}
        listId={listId}
      />
    </>
  )
}

export default AddCard;
