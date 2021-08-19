export default class ImageTheme {
  constructor(
    public id: number,
    public url: string,
    public active: boolean,
  ) {
    this.id = id;
    this.url = url;
    this.active = active;
  }
}
