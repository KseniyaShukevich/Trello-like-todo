export default class Image {
  public createdAt: string;
  public format: string;
  public originalFilename: string;
  public url: string;

  constructor(
    createdAt: string,
    format: string,
    originalFilename: string,
    url: string,
  ) {
    this.createdAt = createdAt;
    this.format = format;
    this.originalFilename = originalFilename;
    this.url = url;
  }
}
