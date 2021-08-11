import React, { useState } from "react";
import { alpha, makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchedTodos } from '../../../slices/listsSlice';
import Card from '../../card/Card';
import { Typography } from "@material-ui/core";
import DialogCard from "../../dialogCard/DialogCard";
import { setBufferTodo } from "../../../slices/bufferTodoSlice";
import Todo from "../../../components/card/Todo";

const useStyles = makeStyles((theme) => ({
  searchResult: {
    position: 'absolute',
    top: theme.spacing(7),
    left: theme.spacing(6),
    zIndex: 150,
    width: '60vw',
    minWidth: 300,
    maxWidth: 650,
    height: 500,
    overflowY: 'auto',
    padding: theme.spacing(1),
  },
  containerCard: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    padding: theme.spacing(1),
    background: alpha(theme.palette.secondary.main, 0.3),
  },
  info: {
    paddingLeft: theme.spacing(1),
  },
  noResults: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(7),
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  setTextSearch: (value: string) => void,
}

const SearchResult: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  setTextSearch,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchedTodos = useSelector(selectSearchedTodos);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const openDialogCard = (todo: Todo): void => {
    setTextSearch('');
    setIsOpen(false);
    setIsEditOpen(true);
    dispatch(setBufferTodo(todo));
  }

  return (
    <Paper
      className={classes.searchResult}
      style={{
        display: isOpen ? 'block' : 'none',
      }}
    >
      {
        searchedTodos.length ? (
          searchedTodos.map((todo) => (
            <div
              key={todo.id}
              className={classes.containerCard}
            >
              <div
                onClick={() => openDialogCard(todo)}
              >
                <Card 
                  todo={todo}
                />
              </div>
              <div>
                <Typography className={classes.info} variant='h6'>
                  {todo.title}
                </Typography>
                <Typography className={classes.info}>
                  In <b>{todo.listName}</b>
                </Typography>
              </div>
  
              <DialogCard 
                isOpen={isEditOpen}
                setIsOpen={setIsEditOpen}
                textButton={'Save'}
                idList={todo.idList}
              />
            </div>
          ))
        ) : (
          <Typography className={classes.noResults}>
            <b>No results</b>
          </Typography>
        )
      }
    </Paper>
  )
}

export default SearchResult;
