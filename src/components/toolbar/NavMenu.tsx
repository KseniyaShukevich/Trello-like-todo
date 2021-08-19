import React, { useState, useCallback } from "react";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PaletteIcon from '@material-ui/icons/Palette';
import { useDispatch, useSelector } from 'react-redux';
import { backHistoryPoint, forwardHistoryPoint } from '../../slices/historySlice';
import { selectTrackHistory, selectHistory } from '../../slices/historySlice';
import DialogThemes from '../dialogThemes/DialogThemes';
import DialogList from '../dialogList/DialogList';
import IList from "../list/IList";

const NavMenu: React.FC = () => {
  const dispatch = useDispatch();
  const trackHistory: number = useSelector(selectTrackHistory);
  const historyTodo: Array<Array<IList>> = useSelector(selectHistory);
  const [isOpenThemes, setIsOpenThemes] = useState<boolean>(false);
  const [isOpenCreateList, setIsOpenCreateList] = useState<boolean>(false);


  const moveBack = (): void => {
    dispatch(backHistoryPoint());
  }

  const moveForward = (): void => {
    dispatch(forwardHistoryPoint());
  }

  const handleOpenCreateList = (): void => {
    setIsOpenCreateList(true);
  }

  const handleOpenThemes = (): void => {
    setIsOpenThemes(true);
  }

  const isDisableMoveBack = (): boolean => {
    return trackHistory === 0 ? true : false;
  }

  const isDisableMoveForward = (): boolean => {
    return trackHistory === historyTodo.length - 1 ? true : false;
  }

  return (
    <>
      <IconButton
        color='inherit'
        disabled={isDisableMoveBack()}
        onClick={moveBack}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton
        color='inherit'
        disabled={isDisableMoveForward()}
        onClick={moveForward}
      >
        <NavigateNextIcon />
      </IconButton>
      <IconButton
        color='inherit'
        onClick={handleOpenCreateList}
      >
        <AddIcon/>
      </IconButton>
      <IconButton
        color='inherit'
        onClick={handleOpenThemes}
      >
        <PaletteIcon />
      </IconButton>
      <DialogThemes
        isOpen={isOpenThemes}
        setIsOpen={setIsOpenThemes}
      />
      <DialogList
        isOpen={isOpenCreateList}
        setIsOpen={setIsOpenCreateList}
      />
    </>
  )
}

export default NavMenu;
