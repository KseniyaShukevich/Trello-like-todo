import { Label } from './labels';
import { v4 as uuidv4 } from 'uuid';

export default class Todo {
  public id: string;
  public idList: string;
  public title: string;
  public labels: Array<Label>;
  public color: string;
  public text: string;
  public startDate: string;
  public endDate: string;
  public images: Array<string>;

  constructor(
    idList: string,
    title: string,
    labels: Array<Label> = [],
    color = '',
    text = '',
    startDate = '',
    endDate = '',
    images = [],
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