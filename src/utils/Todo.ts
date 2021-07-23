import { Label } from './labels';
import { v4 as uuidv4 } from 'uuid';

export default class Todo {
  id: string;
  title: string;
  labels: Array<Label>;
  color: string;
  text: string;
  startDate: Date | null;
  endDate: Date | null;

  constructor(
    // id: string,
    title: string,
    labels: Array<Label> = [],
    color = '',
    text = '',
    startDate: Date | null = null,
    endDate: Date | null = null,
  ) {
    this.id = uuidv4();
    this.labels = labels;
    this.color = color;
    this.title = title;
    this.text = text;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}