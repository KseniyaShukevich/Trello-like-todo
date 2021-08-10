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
import IImage from '../image/image';
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

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

interface IUploadableFile {
  file: File,
  errors: Array<FileError>,
}

interface IProps {
  isNewCard?: boolean,
  isOpen: boolean,
  textButton: string,
  idList: string,
  setIsOpen: (value: boolean) => void,
}

const DialogCard: React.FC<IProps> = ({
  isNewCard,
  isOpen,
  textButton,
  idList,
  setIsOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bufferTodo = useSelector(selectBufferTodo);
  const [files, setFiles] = useState<Array<IUploadableFile>>([]);
  const [isErrorTitleEmpty, setIsErrorTitleEmpty] = useState<boolean>(false);
  const [isErrorTitleLonger, setIsErrorTitleLonger] = useState<boolean>(false);
  const [isErrorImage, setIsErrorImage] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const isValidImages = (): boolean => {
    return !files.some((wrapperFile) => wrapperFile.errors.length);
  }

  const isValidTitle = (): boolean => {
    const isCorrect: boolean = !!bufferTodo?.title && bufferTodo.title.length <= 50;

    !bufferTodo?.title && setIsErrorTitleEmpty(true);
    !(bufferTodo?.title && bufferTodo?.title.length <= 50) && setIsErrorTitleLonger(true);

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
  
  const handleChangeTodo = (): void => {
    const isCorrectImage: boolean = isValidImages();
    const isCorrectTitle: boolean = isValidTitle();

    if (isCorrectImage && isCorrectTitle) {
      setIsLoader(true);
      const validFiles: Array<IUploadableFile> = files.filter((wrapperFile) => !wrapperFile.errors.length);

      Promise.all(validFiles.map(async (wrapperFile) => await uploadImage(wrapperFile.file)))
        .then((values) => {
          const newImages: Array<IImage> = getNewImages(values);

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

  const handleDeleteTodo = (): void => {
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
      <DialogContent dividers={true}>
        <div className={classes.container}>
          <CardColor />
          <div className={classes.lineDecoration} />
          <Labels />
          <div className={classes.lineDecoration} />
          <InputTitle 
            isErrorTitleEmpty={isErrorTitleEmpty}
            isErrorTitleLonger={isErrorTitleLonger}
            setIsErrorTitleEmpty={setIsErrorTitleEmpty}
            setIsErrorTitleLonger={setIsErrorTitleLonger}
          />
          <MultipleFileUploadField 
            files={files}
            isError={isErrorImage}
            setFiles={setFiles}
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
