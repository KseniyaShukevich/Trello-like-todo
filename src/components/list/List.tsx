import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists, setLists } from '../../slices/listsSlice';
import { setCanSave } from '../../slices/historySlice';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';
import Todo from '../../utils/Todo';
import List from '../../utils/List';

const useStyles = makeStyles((theme) => ({
  list: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  scroll: {
    overflowY: 'auto',
    maxHeight: '80vh',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
  },
}))

interface IProps {
  list: List,
  focusedList: string,
  focusedTodo: string,
  isDragging: boolean,
  keyup: string,
  setKeyup: (value: string) => void,
  setFocusedList: (value: string) => void,
  setFocusedTodo: (value: string) => void,
  indexList: number,
  handleDragStart: any,
  handleDragEnter: any,
  handleDragEnterList: any,
  getStyles: any,
}

const ListElement: React.FC<IProps> = ({
  list,
  focusedList,
  focusedTodo,
  isDragging,
  keyup,
  setKeyup,
  setFocusedList,
  setFocusedTodo,
  indexList,
  handleDragStart,
  handleDragEnter,
  handleDragEnterList,
  getStyles,

}) => {
  const classes = useStyles();
  const listNode = useRef<any>(null);

  return (
    <div 
      key={list.id}
      style={{
        height: '100%',
      }}
    >
      <div
        key={list.id}
        onDragEnter={(isDragging && !list.todos.length ? (e: any) => handleDragEnter({ indexList, indexTodo: 0 }, e) : null) as any}
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
            listNode={listNode}
            handleDragEnter={handleDragEnter.bind(undefined, { indexList, indexTodo, idTodo: todo.id })}
            isDragging={isDragging}
            getStyles={getStyles.bind(undefined, { indexList, indexTodo })}
            handleDragStart={handleDragStart.bind(undefined, { indexList, indexTodo, idTodo: todo.id })}
            todo={todo}
            focusedList={focusedList}
            focusedTodo={focusedTodo}
            keyup={keyup}
            setFocusedList={setFocusedList}
            setFocusedTodo={setFocusedTodo}
            setKeyup={setKeyup}
          />
        ))}

         </div>
        <AddCard 
          idList={list.id}
        />
      </div>
      <div
        onDragEnter={(isDragging ? (e: any) => handleDragEnterList(indexList, e) : null) as any}
        style={{
          height: '100%',
        }}
      />
    </div>
  )
}

export default ListElement;