import React, { useCallback, useEffect } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import SingleFileUpload from './SingleFileUpload';
import { makeStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import IImage from './IImage';
import ImageBlock from './ImageBlock';
import { v4 as uuidv4 } from 'uuid';
import IUploadableFile from './IUploadableFile';

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

interface IProps {
  files: Array<IUploadableFile>,
  isError: boolean,
  bufferImages: Array<IImage>,
  setFiles: any,
  setIsError: (value: boolean) => void,
  setBufferImages: any,
}

const MultipleFileUploadField: React.FC<IProps> = ({
  files,
  isError,
  bufferImages,
  setFiles,
  setIsError,
  setBufferImages,
}) => {
  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
    const mappedAcc = acceptedFiles.map((file) => ({file, isMain: false, id: uuidv4(), errors: []}));
    const mappedRej = rejectedFiles.map((file) => ({...file, id: uuidv4()}));

    setFiles((prev: Array<IUploadableFile>) => {
      if (prev.length) {
        prev.map((item, index) => item.isMain = index === 0);
      } else {
        mappedAcc.map((item, index) => item.isMain = index === 0);
      }

      return [...prev, ...mappedAcc, ...mappedRej];
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 2000 * 1024,
  });

  const onDeleteFile = (file: File) => {
    setFiles((prev: Array<IUploadableFile>) => prev
      .filter((fileWrapper) => fileWrapper.file !== file)
      .map((fileWrapper, index) => {
        fileWrapper.isMain = index === 0;

        return fileWrapper;
      }));
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
        bufferImages.map((image, index) => (
          <ImageBlock
            key={image.url}
            isMain={index === 0}
            image={image}
            setBufferImages={setBufferImages}
          />
        ))
      }

      {
        files.map((fileWrapper) => (
          <SingleFileUpload
            key={fileWrapper.id}
            isMain={!bufferImages.length && !!fileWrapper.isMain}
            file={fileWrapper.file}
            errors={fileWrapper.errors}
            onDeleteFile={onDeleteFile}
          />
        ))
      }
    </>
  )
}

export default MultipleFileUploadField;
