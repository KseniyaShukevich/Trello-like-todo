import React, { useCallback, useState, useEffect } from 'react'
import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import SingleFileUpload from './SingleFileUpload';
import { makeStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo } from "../../slices/bufferTodoSlice";
import ImageClass from './image';
import Image from './Image';

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
    transition: '0.5s',
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
    transition: '0.5s',
  },
  error: {
    height: '20px',
  },
}));

interface IUploadableFile {
  file: File,
  errors: Array<FileError>,
}

interface IProps {
  files: Array<IUploadableFile>,
  setFiles: any,
  isError: boolean,
  setIsError: (value: boolean) => void,
}

const MultipleFileUploadField: React.FC<IProps> = ({
  files,
  setFiles,
  isError,
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
    maxSize: 1000 * 1024,
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
          <Image key={image.url} image={image} />
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
