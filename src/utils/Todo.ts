import { Label } from './labels';
import { v4 as uuidv4 } from 'uuid';

export default class Todo {
  public id: string;
  public idList: string;
  public title: string;
  public labels: Array<Label>;
  public color: string;
  public text: string;
  public startDate: string | null;
  public endDate: string | null;

  constructor(
    // id: string,
    idList: string,
    title: string,
    labels: Array<Label> = [],
    color = '',
    text = '',
    startDate: string | null = null,
    endDate: string | null = null,
  ) {
    this.id = uuidv4();
    this.idList = idList;
    this.labels = labels;
    this.color = color;
    this.title = title;
    this.text = text;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}