import React, { useState } from 'react';
import AddButton from '../../utils/AddButton';
import AddNewListName from './AddNewListName';

const AddList: React.FC = () => {
  const [isNewList, setIsNewList] = useState<boolean>(false);
  
  return (
    <>
      {
        isNewList ? (
          <AddNewListName 
            setIsNewList={setIsNewList}
          />
        ) : (
          <AddButton
            onClick={() => setIsNewList(true)}
            text={'Add another list'}
          />
        )
      }
    </>
  )
}

export default AddList;
