import { Label } from '../dialogCard/Label';
import { v4 as uuidv4 } from 'uuid';
import IImage from '../image/IImage';

export default class Todo {
  public id: string;

  constructor(
    public idList: string,
    public title: string,
    public labels: Array<Label> = [],
    public color = '',
    public text = '',
    public startDate = '',
    public endDate = '',
    public images: Array<IImage> = [],
  ) {
    this.id = uuidv4();
    this.idList = idList;
    this.labels = labels;
    this.color = color;
    this.title = title;
    this.text = text;
    this.startDate = startDate;
    this.endDate = endDate;
    this.images = images;
  }
}