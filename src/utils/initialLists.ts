import IList from '../components/list/IList';
import Todo from '../components/card/Todo';
import colors from './colors';
import labels, { Label } from './labels';

function getInitialLabels(): Array<Label> {
  return labels.map((label) => label.clone());
}

const todo0: Todo = new Todo(
  '1',
  'Todo exemple 1',
  [
    labels[0].clone(),
    labels[1].clone(),
    labels[2].clone(),
    labels[3].clone(),
    labels[4].clone(),
    labels[5].clone('adskl fsd', true),
    labels[6].clone(),
  ],
  colors[1],
  'dask am akm kmak msamsk akmalk l dl a ldknalsk ajoi jfisjal kmfak slo josj nla kaosi sj asnl fsk',
  new Date().toString(),
  new Date().toString(),
);

const todo1: Todo = new Todo(
  '1',
  'Todo exemple 2',
  getInitialLabels(),
);

const todo2: Todo = new Todo(
  '1',
  'Todo exemple 3',
  [
    labels[0].clone(),
    labels[1].clone('', true),
    labels[2].clone(),
    labels[3].clone('sdm kam', true),
    labels[4].clone(),
    labels[5].clone(),
    labels[6].clone(),
  ]
)

const INITIAL_LISTS: Array<IList> = [
    {
      id: '1', 
      name: 'IList exemple', 
      todos: [
        todo0,
        todo1,
        todo2,
      ]
    }
];

export default INITIAL_LISTS;
