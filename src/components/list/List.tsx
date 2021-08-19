import React, { useRef, DragEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';
import IList from './IList';
import IParams from '../../utils/IParams';

const useStyles = makeStyles((theme) => ({
  containerList: {
    height: '100%',
  },
  list: {
    marginRight: theme.spacing(2),
  },
  scroll: {
    overflowY: 'auto',
    maxHeight: '80vh',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
  },
  droppingContainer: {
    height: '100%',
  },
}))

interface IProps {
  list: IList,
  keyup: string,
  indexList: number,
  focusedList: string,
  focusedTodo: string,
  isDragging: boolean,
  setKeyup: (value: string) => void,
  getStyles: (params: IParams) => string,
  setFocusedList: (value: string) => void,
  setFocusedTodo: (value: string) => void,
  handleDragEnterList: (indexList: number) => void,
  handleDragStart: (params: IParams, e: DragEvent<HTMLDivElement>) => void,
  handleDragEnter: (params: IParams, e: DragEvent<HTMLDivElement>) => void,
}

const ListElement: React.FC<IProps> = ({
  list,
  keyup,
  indexList,
  focusedList,
  focusedTodo,
  isDragging,
  setKeyup,
  getStyles,
  setFocusedList,
  setFocusedTodo,
  handleDragEnterList,
  handleDragStart,
  handleDragEnter,
}) => {
  const classes = useStyles();
  const listNode = useRef<HTMLDivElement>(null);

  return (
    <div 
      key={list.id}
      className={classes.containerList}
    >
      <div
        key={list.id}
        onDragEnter={
          (isDragging && !list.todos.length 
          ? 
          (e: DragEvent<HTMLDivElement>) => handleDragEnter({ indexList, indexTodo: 0 }, e) 
          : 
          null) as any
        }
        className={classes.list}
      >
        <ListName
          list={list}
        />
        <div 
          className={classes.scroll}
          ref={listNode}
        >

        {list.todos.map((todo, indexTodo) => (
          <Card 
            key={todo.id}
            todo={todo}
            keyup={keyup}
            listNode={listNode}
            isDragging={isDragging}
            focusedList={focusedList}
            focusedTodo={focusedTodo}
            setKeyup={setKeyup}
            setFocusedList={setFocusedList}
            setFocusedTodo={setFocusedTodo}
            getStyles={getStyles.bind(undefined, { indexList, indexTodo })}
            handleDragEnter={handleDragEnter.bind(undefined, { indexList, indexTodo })}
            handleDragStart={handleDragStart.bind(undefined, { indexList, indexTodo })}
          />
        ))}
         </div>
      </div>
      <div
        onDragEnter={(isDragging ? () => handleDragEnterList(indexList) : null) as any}
        className={classes.droppingContainer}
      >
        <AddCard 
          idList={list.id}
        />
      </div>
    </div>
  )
}

export default ListElement;