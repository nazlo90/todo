import {Todo} from './todo';

export class TodoForm implements Todo {
  title: string;
  description: string;
  id: string;
  getObjectModel() {
    return JSON.parse(JSON.stringify(this));
  }
}
