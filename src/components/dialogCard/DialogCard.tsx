import React, { useState, useEffect } from "react";
import CardColor from './CardColor';
import Labels from './Labels';
import InputTitle from './InputTitle';
import InputText from './InputText';
import Date from './Date';
import DialogLayout from '../../utils/DialogLayout';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from "../../slices/listsSlice";
import MultipleFileUploadField from '../image/MultipleFileUploadField';
import uploadImage from '../image/service';
import IImage from '../image/IImage';
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IUploadableFile from '../image/IUploadableFile';
import Todo from "../card/Todo";
import { Label } from './Label';

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: '55vh',
  },
  startDate: {
    marginRight: theme.spacing(1),
  },
  dates: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  lineDecoration: {
    background: theme.palette.primary.main,
    width: '100%',
    height: 1,
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  buttonForEditCard: {
    width: '49%',
    marginTop: theme.spacing(2),
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface IProps {
  isNewCard?: boolean,
  isOpen: boolean,
  todo: Todo,
  textButton: string,
  idList: string,
  setIsOpen: (value: boolean) => void,
}

const DialogCard: React.FC<IProps> = ({
  isNewCard,
  isOpen,
  todo,
  textButton,
  idList,
  setIsOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [files, setFiles] = useState<Array<IUploadableFile>>([]);
  const [isErrorTitleEmpty, setIsErrorTitleEmpty] = useState<boolean>(false);
  const [isErrorTitleTooLong, setIsErrorTitleTooLong] = useState<boolean>(false);
  const [isErrorImage, setIsErrorImage] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [bufferTodo, setBufferTodo] = useState<Todo | null>(null);
  const [bufferColor, setBufferColor] = useState<string>('');
  const [bufferLabels, setBufferLabels] = useState<Array<Label> | null>(null);
  const [bufferTitle, setBufferTitle] = useState<string>('');
  const [bufferImages, setBufferImages] = useState<Array<IImage> | null>(null);
  const [bufferText, setBufferText] = useState<string>('');
  const [bufferStartDate, setBufferStartDate] = useState<string>('');
  const [bufferEndDate, setBufferEndDate] = useState<string>('');

  const isValidImages = (): boolean => {
    return !files.some((wrapperFile) => wrapperFile.errors.length);
  }

  const isValidTitle = (): boolean => {
    const isCorrect: boolean = !!bufferTitle && bufferTitle.length <= 50;

    !bufferTitle && setIsErrorTitleEmpty(true);
    !(bufferTitle.length <= 50) && setIsErrorTitleTooLong(true);

    return isCorrect;
  }

  const getNewImages = (values: Array<any>): Array<IImage> => {
    const newImages: Array<IImage> = values.map((value: any) => (
      {
        createdAt: value.created_at,
        format: value.format,
        originalFilename: value.original_filename,
        url: value.url,
      }
    ));

    return newImages;
  }

  const onClose = () => {
    setFiles([]);
    setIsOpen(false);
  }

  useEffect(() => {
    setBufferTodo(todo);
    setBufferColor(todo.color);
    setBufferLabels(todo.labels);
    setBufferTitle(todo.title);
    setBufferImages(todo.images);
    setBufferText(todo.text);
    setBufferStartDate(todo.startDate);
    setBufferEndDate(todo.endDate);
  }, [isOpen])

  const handleChangeTodo = (): void => {
    const isCorrectImage: boolean = isValidImages();
    const isCorrectTitle: boolean = isValidTitle();

    if (isCorrectImage && isCorrectTitle && bufferImages) {
      setIsLoader(true);
      const validFiles: Array<IUploadableFile> = files.filter((wrapperFile) => !wrapperFile.errors.length);

      Promise.all(validFiles.map(async (wrapperFile) => await uploadImage(wrapperFile.file)))
        .then((values) => {
          const newImages: Array<IImage> = getNewImages(values);

          dispatch(addTodo({
            idList,
            todo: {
              ...bufferTodo,
              color: bufferColor,
              labels: bufferLabels,
              title: bufferTitle,
              images: [...bufferImages, ...newImages],
              text: bufferText,
              startDate: bufferStartDate,
              endDate: bufferEndDate,
            },
            // newImages: newImages,
          }));

          onClose();
          setIsLoader(false);
        })
        .catch((errors) => {
          console.log('CANNOT SET TODO: ', errors);
        });
    }
  }

  const handleDeleteTodo = (): void => {
    bufferTodo && dispatch(deleteTodo({
      idList: bufferTodo.idList,
      idTodo: bufferTodo.id,
    }));

    onClose();
  }

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={onClose}
      title={'Card'}
    >
      <DialogContent dividers={true}>
        <div className={classes.container}>
          <CardColor
            bufferColor={bufferColor}
            setBufferColor={setBufferColor}
          />
          <div className={classes.lineDecoration} />
          {
            bufferLabels && (
              <Labels
                bufferLabels={bufferLabels}
                setBufferLabels={setBufferLabels}
              />
            )
          }
          <div className={classes.lineDecoration} />
          <InputTitle
            bufferTitle={bufferTitle}
            isErrorTitleEmpty={isErrorTitleEmpty}
            isErrorTitleTooLong={isErrorTitleTooLong}
            setBufferTitle={setBufferTitle}
            setIsErrorTitleEmpty={setIsErrorTitleEmpty}
            setIsErrorTitleTooLong={setIsErrorTitleTooLong}
          />
          {
            bufferImages && (
              <MultipleFileUploadField
                files={files}
                isError={isErrorImage}
                bufferImages={bufferImages}
                setFiles={setFiles}
                setIsError={setIsErrorImage}
                setBufferImages={setBufferImages}
              />
            )
          }
          <InputText
            bufferText={bufferText}
            setBufferText={setBufferText}
          />
          <div className={classes.dates}>
            <Date
              text={'Start date'}
              className={classes.startDate}
              bufferDate={bufferStartDate}
              setBufferDate={setBufferStartDate}
            />
            <Date
              text={'End date'}
              bufferDate={bufferEndDate}
              setBufferDate={setBufferEndDate}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions className={isLoader ? classes.loader : classes.containerButtons}>
        {
          isLoader ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                variant='contained'
                color='primary'
                className={isNewCard ? classes.button : classes.buttonForEditCard}
                onClick={handleChangeTodo}
              >
                {textButton}
              </Button>
              {
                !isNewCard && (
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.buttonForEditCard}
                    onClick={handleDeleteTodo}
                  >
                    Delete
                  </Button>
                )
              }
            </>
          )
        }
      </DialogActions>
    </DialogLayout>
  )
}

export default DialogCard;
