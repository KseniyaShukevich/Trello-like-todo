import React, { useState } from "react";
import CardColor from './CardColor';
import Labels from './Labels';
import InputTitle from './InputTitle';
import InputText from './InputText';
import Date from './Date';
import DialogLayout from '../../utils/DialogLayout';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo } from "../../slices/bufferTodoSlice";
import { addTodo, deleteTodo } from "../../slices/listsSlice";
import MultipleFileUploadField from '../image/MultipleFileUploadField';
import { FileError } from 'react-dropzone';
import uploadImage from '../image/service';
import Image from '../image/image';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    overflowY: 'auto',
    maxHeight: '70vh',
  },
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
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface IUploadableFile {
  file: File,
  errors: Array<FileError>,
}

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
  const [files, setFiles] = useState<Array<IUploadableFile>>([]);
  const [isErrorTitle, setIsErrorTitle] = useState<boolean>(false);
  const [isErrorImage, setIsErrorImage] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const isValidImages = (): boolean => {
    return !files.some((wrapperFile) => wrapperFile.errors.length);
  }

  const isValidTitle = (): boolean => {
    const isCorrect = !!bufferTodo?.title;
    !isCorrect && setIsErrorTitle(true);

    return isCorrect;
  }

  const getNewImages = (values: Array<any>): Array<Image> => {
    const newImages: Array<Image> = values.map((value: any) => new Image(
      value.created_at,
      value.format,
      value.original_filename,
      value.url,
    ));

    return JSON.parse(JSON.stringify(newImages));
  }

  const onClose = () => {
    setFiles([]);
    setIsOpen(false);
  }
  
  const hundleChangeTodo = (): void => {
    const isCorrectImage = isValidImages();
    const isCorrectTitle = isValidTitle();

    if (isCorrectImage && isCorrectTitle) {
      setIsLoader(true);
      const validFiles: Array<IUploadableFile> = files.filter((wrapperFile) => !wrapperFile.errors.length);

      Promise.all(validFiles.map(async (wrapperFile) => await uploadImage(wrapperFile.file)))
        .then((values) => {
          const newImages: Array<Image> = getNewImages(values);
          dispatch(addTodo({
            idList,
            todo: bufferTodo,
            newImages: newImages,
          }));

          onClose();
          setIsLoader(false);
        })
        .catch((errors) => {
          console.log('CANNOT SET TODO: ', errors);
        });
    }
  }

  const hundleDeleteTodo = (): void => {
    bufferTodo && dispatch(deleteTodo({ 
      idList, 
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
      <>
        <div className={classes.container}>
          <CardColor />
          <div className={classes.hr} />
          <Labels />
          <div className={classes.hr} />
          <InputTitle 
            isError={isErrorTitle}
            setIsError={setIsErrorTitle}
          />
          <MultipleFileUploadField 
            files={files}
            setFiles={setFiles}
            isError={isErrorImage}
            setIsError={setIsErrorImage}
          />
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
        </div>
        {
          isLoader ? (
            <div className={classes.loader}>
              <CircularProgress />
            </div>
          ) : (
            <div className={classes.containerButtons}>
              <Button 
                variant='contained' 
                color='primary'
                className={isNewCard ? classes.button : classes.buttonForEditCard}
                onClick={() => {
                  hundleChangeTodo();
                }}
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
          )
        }
      </>
    </DialogLayout>
  )
}

export default DialogCard;
