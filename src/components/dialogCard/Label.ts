import CONSTANTS from '../../utils/CONSTANTS';
import { v4 as uuidv4 } from 'uuid';

export class Label {
  constructor(
    public id: string,
    public color: string,
    public text = '',
    public isActive = false,
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

const labels: Array<Label> = CONSTANTS.COLORS.map((color) => new Label(uuidv4(), color));

export default labels;
