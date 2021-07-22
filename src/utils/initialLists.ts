import List from '../components/list/list';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import colors from './colors';
import labels, { Label } from './labels';

function getInitialLabels(): Array<Label> {
  return labels.map((label) => label.clone());
}

const todo0: Todo = new Todo(
  uuidv4(),
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
  'dask am akm kmak msamsk akmalk l',
  '20.07.2021',
  '21.07.2021',
);

const todo1: Todo = new Todo(
  uuidv4(),
  'Todo exemple 2',
  getInitialLabels(),
);

const todo2: Todo = new Todo(
  uuidv4(),
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

const INITIAL_LISTS: Array<List> = [
  new List(
    uuidv4(), 
    'List exemple', 
    [
      todo0,
      todo1,
      todo2,
    ]
  )
];

export default INITIAL_LISTS;
