import React, { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { editList, deleteList } from '../../slices/listsSlice';
import { useDispatch } from 'react-redux';
import Button from "@material-ui/core/Button";
import CircleButton from '../../utils/CircleButton';
import List from './list';

const useStyles = makeStyles((theme) => ({
  editName: {
    padding: theme.spacing(1),
    background: alpha(theme.palette.secondary.main, 0.9),
    width: `calc(300px - ${theme.spacing(2)}px)`,
    position: 'relative',
  },
  name: {
    width: '300px',
    height: '36px',
    textAlign: 'center',
    lineHeight: '36px',
    background: alpha(theme.palette.secondary.main, 0.9),
    position: 'relative',
  },
  containerButtons: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButtons: {
    width: '49%',
  },
}))

interface IProps {
  list: List,
}

const ListName: React.FC<IProps> = ({
  list,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(list.name);

  const hundleEdit = (): void => {
    setIsEdit(true);
  }

  const hundleClose = () => {
    setIsEdit(false);
  }

  const save = (): void => {
    dispatch(editList({
      id: list.id,
      newName: name,
    }));

    setIsEdit(false);
  }

  const hundleDelete = (): void => {
    dispatch(deleteList(list));
  }

  return (
    <>
      {
        isEdit ? (
          <Paper 
            className={classes.editName}
          >
            <TextField 
              id="standard-basic" 
              label="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CircleButton
              onClick={hundleClose}
              Child={CloseIcon}
            />
            <div className={classes.containerButtons}>
              <Button 
                className={classes.editButtons}
                variant='outlined' 
                color='primary'
                onClick={save}
              >
                Save
              </Button>
              <Button 
                className={classes.editButtons}
                variant='outlined' 
                color='primary'
                onClick={hundleDelete}
              >
                Delete list
              </Button>
            </div>
          </Paper>
        ) : (
          <Paper 
            className={classes.name}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {list.name}
            {
              isHover && (
                <CircleButton
                  onClick={hundleEdit}
                  Child={EditIcon}
                />
              )
            }
          </Paper>
        )
      }
    </>
  )
}

export default ListName;
