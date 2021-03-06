import {Component, NgModule, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Todo, MoveTodo} from '../models/todo';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {TodoForm} from '../models/todo-form';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService} from 'primeng/primeng';

@NgModule({
  providers: [ConfirmationService]
})
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  private todoCollection: AngularFirestoreCollection<Todo>;
  private doneCollection: AngularFirestoreCollection<Todo>;
  todos$: Observable<Todo[]>;
  todosN: Todo[] = [];
  todosLength = 0;
  done$: Observable<Todo[]>;
  dones: Todo[] = [];
  doneLength = 0;
  todoItem: TodoForm = new TodoForm();
  userform: FormGroup;
  dragToDone: Todo[] = [];
  msgs = [];
  focused: boolean;
  focused_done: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private db: AngularFirestore,
              public authService: AuthService,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.userform = this.fb.group({
      'title': new FormControl('', Validators.compose([Validators.required])),
      'descr': new FormControl('', Validators.compose([Validators.required]))
    });
    this.todoCollection = this.db.collection<Todo>(environment.firebaseDatabaseKeys.todos,
      ref => ref.where('userId', '==', this.authService.userId()));
    this.todos$ = this.todoCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
    this.todos$.subscribe(todos => {this.todosLength = todos.length; console.log(todos); this.todosN = todos; });
    this.doneCollection = this.db.collection<Todo>(environment.firebaseDatabaseKeys.done,
      ref => ref.where('userId', '==', this.authService.userId()));
    this.done$ = this.doneCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
    this.done$.subscribe(todos => {this.doneLength = todos.length; console.log(todos); this.dones = todos; });
    console.log(AuthService);
  }

  addInfo() {
    this.todoItem.userId = this.authService.userId();
    this.todoCollection.add(this.todoItem.getObjectModel());
    this.userform.reset();
  }

  deleteInfo(id: string) {
    // this.todoCollection.doc(id).delete();
    console.log(this.todoCollection.doc(id));
  }

  editInfo(todo: Todo) {
    this.todoCollection.doc(todo.id).update(todo);
  }

  deleteInfoDone(id: string) {
    this.doneCollection.doc(id).delete();
  }

  editInfoDone(todo: Todo) {
    this.doneCollection.doc(todo.id).update(todo);
  }

  // moveToDone(id: string, title: string, description: string) {
  //   this.db.collection<MoveDone>(environment.firebaseDatabaseKeys.done).add({title: title, description: description});
  //   this.todoCollection.doc(id).delete();
  // }
  // moveToTodo(id: string, title: string, description: string) {
  //   this.db.collection<MoveTodo>(environment.firebaseDatabaseKeys.todos).add({title: title, description: description});
  //   this.doneCollection.doc(id).delete();
  // }

  onDragStart(event) {
    console.log(event);
    const id = event.target.children[0].attributes[3].value;
    const title = event.target.children[0].attributes[4].value;
    const descr = event.target.children[0].attributes[5].value;
    const userId = this.authService.userId();
    this.dragToDone.push({title: title, description: descr, id: id, userId: userId});
    this.focused = true;
    console.log('onDragStart', title, descr, id);
  }

  onDragEnd(event) {
    this.dragToDone.length = 0;
    this.focused = false;
    console.log('onDragEnd');
  }

  onDrop(id: string, title: string, description: string) {
    this.db.collection<MoveTodo>(environment.firebaseDatabaseKeys.done).add({
      title: this.dragToDone[0].title,
      description: this.dragToDone[0].description,
      userId: this.dragToDone[0].userId
    });
    this.todoCollection.doc(this.dragToDone[0].id).delete();
  }


  onDragStartDone(event) {
    const id = event.target.children[0].attributes[3].value;
    const title = event.target.children[0].attributes[4].value;
    const descr = event.target.children[0].attributes[5].value;
    const userId = this.authService.userId();
    this.dragToDone.push({title: title, description: descr, id: id, userId: userId});
    this.focused_done = true;
    console.log('onDragStartDone', title, descr, id);
  }

  onDragEndDone() {
    this.dragToDone.length = 0;
    this.focused_done = false;
    console.log('onDragEndDone');
  }

  onDropDone(id: string, title: string, description: string) {
    this.db.collection<MoveTodo>(environment.firebaseDatabaseKeys.todos).add({
      title: this.dragToDone[0].title,
      description: this.dragToDone[0].description,
      userId: this.dragToDone[0].userId
    });
    this.doneCollection.doc(this.dragToDone[0].id).delete();
  }

  confirm(event) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this task?',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.todoCollection.doc(event.path[3].children[0].attributes[3].value).delete();
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  confirmDone(event) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this task?',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.doneCollection.doc(event.path[3].children[0].attributes[3].value).delete();
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

  get progress() {
    const sum = this.todosLength + this.doneLength;
    let prog = 100;
    if (this.todosLength > 0) {
      prog = this.doneLength * 100 / sum;
    } else {
      prog = 100;
    }
    return Math.round(prog);
  }
}
