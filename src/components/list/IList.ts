import Todo from '../../components/card/Todo';

export default interface IList {
  id: string,
  name: string,
  todos: Array<Todo>,
}
