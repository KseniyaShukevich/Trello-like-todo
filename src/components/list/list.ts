export default class List {
  id: string;
  name: string;
  todos: Array<number>;

  constructor(
    id: string,
    name: string,
    todos: Array<number>,
  ) {
    this.id = id;
    this.name = name;
    this.todos = todos;
  }
}
