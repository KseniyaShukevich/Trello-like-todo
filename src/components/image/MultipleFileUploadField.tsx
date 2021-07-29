import React, { useCallback, useState } from 'react'
import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import SingleFileUpload from './SingleFileUpload';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  active: {
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(2),
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
}));

interface IUploadableFile {
  file: File,
  errors: Array<FileError>
}

const MultipleFileUploadField: React.FC = () => {
  const classes = useStyles();
  const [files, setFiles] = useState<Array<IUploadableFile>>([]);

  const onDrop = useCallback((acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
    const mappedAcc = acceptedFiles.map((file) => ({file, errors: []}));
    setFiles((prev) => [...prev, ...mappedAcc, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  const onDelete = (file: File) => {
    setFiles((prev) =>  prev.filter((fileWrapper) => fileWrapper.file !== file));
  }

  return (
    <>
      <div {...getRootProps()} className={isDragActive ? classes.active : classes.notActive}>
        <input {...getInputProps()} />
          <p>Drag &apos;n&apos; drop some images here, or click to select images</p>
      </div>

      {
        files.map((fileWrapper, index) => (
          <SingleFileUpload onDelete={onDelete} key={index} file={fileWrapper.file} />
        ))
      }
    </>
  )
}

export default MultipleFileUploadField;
