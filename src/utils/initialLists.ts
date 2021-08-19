import IList from '../components/list/IList';
import Todo from '../components/card/Todo';
import CONSTANTS from './CONSTANTS';
import labels, { Label } from '../components/dialogCard/Label';
import moment from 'moment';

function getInitialLabels(): Array<Label> {
  return labels.map((label) => label.clone());
}

const todo0: Todo = new Todo(
  '1',
  'Todo exemple 1',
  getInitialLabels(),
  '',
  '',
  moment(new Date()).format('YYYY-MM-DD'),
  moment(new Date()).format('YYYY-MM-DD'),
  [
    {
      createdAt: '2021-08-09T12:42:32Z',
      format: 'gif',
      originalFilename: 'HceZ',
      url: 'http://res.cloudinary.com/dshffjhdkjj/image/upload/v1628512952/trello-todo/xvvqslq6tgmnhiqtevy3.gif',
    }
  ]
);

const todo1: Todo = new Todo(
  '1',
  'Todo exemple 2',
  [
    labels[0].clone(),
    labels[1].clone('', true),
    labels[2].clone(),
    labels[3].clone('sdm kam', true),
    labels[4].clone(),
    labels[5].clone(),
    labels[6].clone(),
  ],
  '',
  '',
  '',
  '',
  [
    {
      createdAt: '2021-08-09T12:42:31Z',
      format: 'gif',
      originalFilename: 'J7Aw',
      url: 'http://res.cloudinary.com/dshffjhdkjj/image/upload/v1628512951/trello-todo/jyv4au09eulvl9zslzzs.gif',
    }
  ],
)

const todo2: Todo = new Todo(
  '1',
  'Todo exemple 3',
  getInitialLabels(),
  CONSTANTS.COLORS[1],
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
);

const INITIAL_LISTS: Array<IList> = [
    {
      id: '1', 
      name: 'This Week', 
      todos: [
        todo0,
        todo1,
        todo2,
      ]
    }
];

export default INITIAL_LISTS;
