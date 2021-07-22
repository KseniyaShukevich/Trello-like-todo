import colors from './colors';
import { v4 as uuidv4 } from 'uuid';

export class Label {
  public id: string;
  public color: string;
  public text: string;
  public isActive: boolean;

  constructor(
    id: string,
    color: string,
    text = '',
    isActive = false,
  ) {
    this.id = id;
    this.color = color;
    this.text = text;
    this.isActive = isActive;
  }

  public clone(
    text = '', 
    isActive = false,
  ): Label {
    return new Label(this.id, this.color, text, isActive);
  }
}

const labels: Array<Label> = colors.map((color) => new Label(uuidv4(), color));

export default labels;
