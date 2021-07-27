import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PlaceCard from '../card/PlaceCard';
import ListClass from '../../utils/List';
import Todo from '../../utils/Todo';

const useStyles = makeStyles((theme) => ({
  list: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}))

interface IProps {
  top: number,
  list: ListClass,
  focusedList: string,
  setFocusedList: (value: string) => void,
  focusedTodo: string,
  setFocusedTodo: (value: string) => void,
  setTop: (value: number) => void,
  nextContainer: string,
  setNextContainer: (value: string) => void,
  elementHeight1: string,
  setElementHeight1: (value: string) => void,
  elementHeight2: string,
  setElementHeight2: (value: string) => void,
}

const List: React.FC<IProps> = ({
  top,
  focusedList,
  setFocusedList,
  focusedTodo,
  setFocusedTodo,
  list,
  setTop,
  nextContainer,
  setNextContainer,
  elementHeight1,
  setElementHeight1,
  elementHeight2,
  setElementHeight2,
}) => {
  const classes = useStyles();
  const refContainer = useRef(null);
  const [elementLeft, setElementLeft] = useState<number>(0);

  useEffect(() => {
    if (list.id === nextContainer) {
      const top = (refContainer.current! as HTMLElement).offsetHeight;
      const left = (refContainer.current! as HTMLElement).offsetLeft;

      setElementLeft(left);
      setTop(top);
    }
  }, [nextContainer]);

  return (
    <>
      {
          <div
            className={classes.list}
          >
            <ListName
              list={list}
            />
            <div 
              ref={refContainer}
            >
              {list.todos.map((todo) => (
                <Card 
                  elementLeft={elementLeft}
                  refContainer={refContainer}
                  focusedList={focusedList}
                  setFocusedList={setFocusedList}
                  focusedTodo={focusedTodo}
                  setFocusedTodo={setFocusedTodo}
                  key={todo.id}
                  idList={list.id}
                  todo={todo}
                  setNextContainer={setNextContainer}
                  topNewPosition={top}
                  elementHeight1={elementHeight1}
                  setElementHeight1={setElementHeight1}
                  elementHeight2={elementHeight2}
                  setElementHeight2={setElementHeight2}
                />
              ))}

              {
                (nextContainer === list.id) && (
                  <PlaceCard 
                    height={elementHeight2}
                  />
                )
              }
             </div>
            <AddCard 
              idList={list.id}
            />
          </div>
      }
    </>
  )
}

export default List;
