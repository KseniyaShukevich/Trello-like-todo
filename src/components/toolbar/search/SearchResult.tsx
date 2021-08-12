import React, { useState } from "react";
import { alpha, makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchedLists } from '../../../slices/listsSlice';
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
  closeSearch: () => void,
}

const SearchResult: React.FC<IProps> = ({
  isOpen,
  closeSearch,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchedLists = useSelector(selectSearchedLists);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const openDialogCard = (todo: Todo): void => {
    setCurrentTodo(todo);
    setIsEditOpen(true);
    dispatch(setBufferTodo(todo));
    closeSearch();
  }

  return (
    <>
    <Paper
      className={classes.searchResult + ' search-result'}
      style={{
        display: isOpen ? 'block' : 'none',
      }}
    >
      {
        searchedLists.length ? (
          searchedLists.map((list) => list.item.todos.map((todo: Todo) => (
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
                  In <b>{list.item.name}</b>
                </Typography>
              </div>
            </div>
          )))
        ) : (
          <Typography className={classes.noResults}>
            <b>No results</b>
          </Typography>
        )
      }
    </Paper>
    <DialogCard 
      isOpen={isEditOpen}
      setIsOpen={setIsEditOpen}
      textButton={'Save'}
      idList={currentTodo ? currentTodo.idList : ''}
    />
   </>
  )
}

export default SearchResult;
