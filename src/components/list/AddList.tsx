import React, { useState } from 'react';
import AddButton from '../../utils/AddButton';
import AddNewListName from './AddNewListName';

const AddList: React.FC = () => {
  const [isNewList, setIsNewList] = useState<boolean>(false);

  if (isNewList) {
    return (
      <AddNewListName
        setIsNewList={setIsNewList} 
      />
    )
  }

  return (
      <AddButton
        onClick={() => setIsNewList(true)}
        text={'Add another list'}
      />
  )
}

export default AddList;
