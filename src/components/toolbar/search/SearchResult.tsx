import React, { useState } from "react";
import { alpha, makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from 'react-redux';
import { selectLists, selectSearchedTodos } from '../../../slices/listsSlice';
import Card from '../../card/Card';
import { Typography } from "@material-ui/core";
import DialogCard from "../../dialogCard/DialogCard";
// import { setBufferTodo } from "../../../slices/bufferTodoSlice";
import Todo from "../../../components/card/Todo";
import IList from "../../list/IList";

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
  // const dispatch = useDispatch();
  const lists: Array<IList> = useSelector(selectLists);
  const searchedTodos: Array<any> = useSelector(selectSearchedTodos);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const openDialogCard = (todo: Todo): void => {
    setCurrentTodo(todo);
    setIsEditOpen(true);
    // dispatch(setBufferTodo(todo));
    closeSearch();
  }

  const getListName = (idList: string): string | undefined => {
    return lists.find((list) => list.id === idList)?.name;
  }

  const getDisplayStyle = (): string => {
    return isOpen ? 'block' : 'none';
  }

  return (
    <>
    <Paper
      className={classes.searchResult + ' search-result'}
      style={{
        display: getDisplayStyle(),
      }}
    >
      {
        searchedTodos.length ? (
          searchedTodos.map((todo: any) => (
            <div
              key={todo.item.id}
              className={classes.containerCard}
            >
              <div
                onClick={() => openDialogCard(todo.item)}
              >
                <Card
                  todo={todo.item}
                />
              </div>
              <div>
                <Typography className={classes.info} variant='h6'>
                  {todo.item.title}
                </Typography>
                <Typography className={classes.info}>
                  In <b>{getListName(todo.item.idList)}</b>
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <Typography className={classes.noResults}>
            <b>No results</b>
          </Typography>
        )
      }
    </Paper>
    {
      currentTodo && (
        <DialogCard
          isOpen={isEditOpen}
          todo={currentTodo}
          setIsOpen={setIsEditOpen}
          textButton={'Save'}
          idList={currentTodo ? currentTodo.idList : ''}
        />
      )
    }
   </>
  )
}

export default SearchResult;
