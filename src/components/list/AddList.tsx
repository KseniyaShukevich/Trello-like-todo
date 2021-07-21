import React, { useState } from 'react';
import AddButton from '../../utils/AddButton';
import InputList from './InputList';

const AddList: React.FC = () => {
  const [isNewList, setIsNewList] = useState<boolean>(false);
  
  return (
    <>
      {
        isNewList ? (
          <InputList 
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
