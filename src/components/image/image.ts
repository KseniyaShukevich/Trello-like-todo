export default class Image {
  public isMain: boolean;
  public createdAt: string;
  public format: string;
  public originalFilename: string;
  public url: string;

  constructor(
    isMain: boolean,
    createdAt: string,
    format: string,
    originalFilename: string,
    url: string,
  ) {
    this.isMain = isMain;
    this.createdAt = createdAt;
    this.format = format;
    this.originalFilename = originalFilename;
    this.url = url;
  }
}