import React, { useCallback, useEffect } from 'react'
import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import SingleFileUpload from './SingleFileUpload';
import { makeStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { useSelector } from 'react-redux';
import { selectBufferTodo } from "../../slices/bufferTodoSlice";
import ImageClass from './IImage';
import ImageBlock from './ImageBlock';

const useStyles = makeStyles((theme) => ({
  active: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    background: theme.palette.secondary.main,
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(10),
    outline: 'none',
    transition: '0.3s',
  },
  notActive: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    background: theme.palette.background.default,
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(10),
    outline: 'none',
    transition: '0.3s',
  },
  error: {
    height: 20,
  },
}));

interface IUploadableFile {
  file: File,
  errors: Array<FileError>,
}

interface IProps {
  files: Array<IUploadableFile>,
  isError: boolean,
  setFiles: any,
  setIsError: (value: boolean) => void,
}

const MultipleFileUploadField: React.FC<IProps> = ({
  files,
  isError,
  setFiles,
  setIsError,
}) => {
  const classes = useStyles();
  const oldImages: Array<ImageClass> | undefined = useSelector(selectBufferTodo)?.images;

  const onDrop = useCallback((acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
    const mappedAcc = acceptedFiles.map((file) => ({file, errors: []}));
    
    setFiles((prev: Array<IUploadableFile>) => [...prev, ...mappedAcc, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, 
    accept: 'image/*', 
    maxSize: 2000 * 1024,
  });

  const onDelete = (file: File) => {
    setFiles((prev: Array<IUploadableFile>) =>  prev.filter((fileWrapper) => fileWrapper.file !== file));
  }

  useEffect(() => {
    setIsError(files.some((wrapperFile) => wrapperFile.errors.length));
  }, [files]);

  return (
    <>
      <Typography
        color='error'
        className={classes.error}
        style={{
          opacity: isError ? 1 : 0
        }}
      >
        Please delete invalid images.
      </Typography>

      <div {...getRootProps()} className={isDragActive ? classes.active : classes.notActive}>
        <input {...getInputProps()} />
          <p>Drag &apos;n&apos; drop some images here, or click to select images</p>
      </div>

      {
        oldImages?.map((image) => (
          <ImageBlock key={image.url} image={image} />
        ))
      }

      {
        files.map((fileWrapper, index) => (
          <SingleFileUpload 
            onDelete={onDelete} 
            key={index} 
            file={fileWrapper.file} 
            errors={fileWrapper.errors} 
          />
        ))
      }
    </>
  )
}

export default MultipleFileUploadField;
