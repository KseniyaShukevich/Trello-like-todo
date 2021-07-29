import React, { useState, useEffect } from "react";
import CardColor from './CardColor';
import Labels from './Labels';
import InputTitle from './InputTitle';
import InputText from './InputText';
import Date from './Date';
import DialogLayout from '../../../utils/DialogLayout';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Todo from '../../../utils/Todo';
import labels, { Label } from '../../../utils/labels';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo } from "../../../slices/bufferTodoSlice";
import { addTodo, deleteTodo } from "../../../slices/listsSlice";
import MultipleFileUploadField from '../../image/MultipleFileUploadField';
// import {MultipleFileUploadField} from '../../upload/MultipleFileUploadField';
import { CardContent, Grid, Card } from "@material-ui/core";
import { Form, Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  startDate: {
    marginRight: theme.spacing(1),
  },
  dates: {
    marginTop: theme.spacing(2),
  },
  hr: {
    background: theme.palette.primary.main,
    width: '100%',
    height: '1px',
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  buttonForEditCard: {
    width: '49%',
    marginTop: theme.spacing(4),
  },
}));

interface IProps {
  isNewCard?: boolean,
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  textButton: string,
  idList: string,
}

const DialogCard: React.FC<IProps> = ({
  isNewCard,
  isOpen,
  setIsOpen,
  textButton,
  idList,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bufferTodo = useSelector(selectBufferTodo);
  const [isError, setIsError] = useState<boolean>(false);
  
  const hundleChangeTodo = (): void => {
    if (bufferTodo?.title) {
      dispatch(addTodo({
        idList,
        todo: bufferTodo,
      }));
  
      setIsOpen(false);
    } else {
      setIsError(true);
    }
  }

  const hundleDeleteTodo = (): void => {
    bufferTodo && dispatch(deleteTodo({ 
      idList, 
      idTodo: bufferTodo.id, 
    }));

    setIsOpen(false);
  }

  return (
    <DialogLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={'Card'}
    >
      <CardColor />
      <div className={classes.hr} />
      <Labels />
      <div className={classes.hr} />
      <InputTitle 
        isError={isError}
        setIsError={setIsError}
      />
      
      <Formik
        initialValues={{ files: [] }}
        // validationSchema={object({
        //   files: array(
        //     object({
        //       url: string().required(),
        //     })
        //   ),
        // })}
        onSubmit={(values) => {
          console.log('values', values);
          // return new Promise((res) => setTimeout(res, 2000));
        }}
      >
        {({ values, errors, isValid, isSubmitting }) => (
          <Form>
            <Grid container spacing={2} direction="column">
              <MultipleFileUploadField />
              <Grid item>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <InputText />
      <div className={classes.dates}>
        <Date 
          isStartDate={true}
          text={'Start date'}
          className={classes.startDate}
        />
        <Date 
          isStartDate={false}
          text={'End date'}
        />
      </div>
      <div className={classes.containerButtons}>
        <Button 
          variant='contained' 
          color='primary'
          className={isNewCard ? classes.button : classes.buttonForEditCard}
          onClick={hundleChangeTodo}
        >
          {textButton}
        </Button>

        {
          !isNewCard && (
            <Button 
              variant='contained' 
              color='primary'
              className={classes.buttonForEditCard}
              onClick={hundleDeleteTodo}
            >
              Delete card
            </Button>
          )
        }
      </div>
    </DialogLayout>
  )
}

export default DialogCard;
