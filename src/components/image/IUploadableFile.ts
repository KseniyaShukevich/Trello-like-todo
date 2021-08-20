import { FileError } from 'react-dropzone';

export default interface IUploadableFile {
  id: string,
  file: File,
  isMain?: boolean,
  errors: Array<FileError>,
}