import { Label } from './labels';

export default class Todo {
  id: string;
  title: string;
  labels: Array<Label>;
  color: string;
  text: string;
  startDate: string;
  endDate: string;

  constructor(
    id: string,
    title: string,
    labels: Array<Label> = [],
    color = '',
    text = '',
    startDate = '',
    endDate = '',
  ) {
    this.id = id;
    this.labels = labels;
    this.color = color;
    this.title = title;
    this.text = text;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}