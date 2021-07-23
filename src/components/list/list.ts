import Todo from '../../utils/Todo';
import { v4 as uuidv4 } from 'uuid';

export default class List {
  id: string;
  name: string;
  todos: Array<Todo>;

  constructor(
    // id: string,
    name: string,
    todos: Array<Todo> = [],
  ) {
    this.id = uuidv4();
    this.name = name;
    this.todos = todos;
  }
}
