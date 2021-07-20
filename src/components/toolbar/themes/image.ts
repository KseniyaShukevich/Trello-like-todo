export default class Image {
  id: number;
  url: string;
  active: boolean;

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
