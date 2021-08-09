export default class ImageTheme {
  public id: number;
  public url: string;
  public active: boolean;

  constructor(
    id: number,
    url: string,
    active: boolean,
  ) {
    this.id = id;
    this.url = url;
    this.active = active;
  }
}
