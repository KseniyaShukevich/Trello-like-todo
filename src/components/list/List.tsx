import React, { useRef, DragEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';
import IList from './IList';
import IParams from '../../utils/IParams';
import { Droppable, Draggable } from 'react-beautiful-dnd';

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
  card: {
    marginBottom: theme.spacing(1),
  },
}))

interface IProps {
  list: IList,
  keyup: string,
  indexList: number,
  focusedList: string,
  focusedTodo: string,
  setKeyup: (value: string) => void,
  setFocusedList: (value: string) => void,
  setFocusedTodo: (value: string) => void,
  handleDragEnterList: (indexList: number) => void,
}

const ListElement: React.FC<IProps> = ({
  list,
  keyup,
  indexList,
  focusedList,
  focusedTodo,
  setKeyup,
  setFocusedList,
  setFocusedTodo,
  handleDragEnterList,
}) => {
  const classes = useStyles();
  const listNode = useRef<any>(null);

  return (
    <div 
      key={list.id}
      className={classes.containerList}
    >
      <div
        key={list.id}
        className={classes.list}
      >
        <ListName
          list={list}
        />
        {/* <div 
          className={classes.scroll}
          ref={listNode}
        > */}
        <Droppable droppableId={list.id}>
          {
            (provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    overflowY: 'auto',
                    maxHeight: '80vh',
                    marginBottom: '8px',
                  }}
                >
                  {list.todos.map((todo, indexTodo) => (
                    <Draggable draggableId={todo.id} key={todo.id} index={indexTodo}>
                      {
                        (provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={classes.card}
                            >
                              <Card 
                                todo={todo}
                                keyup={keyup}
                                listNode={listNode}
                                focusedList={focusedList}
                                focusedTodo={focusedTodo}
                                setKeyup={setKeyup}
                                setFocusedList={setFocusedList}
                                setFocusedTodo={setFocusedTodo}
                              />
                            </div>
                          )
                        }
                      }
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )
            }
          }
        </Droppable>
        <AddCard 
          idList={list.id}
        />
      </div>
    </div>
  )
}

export default ListElement;