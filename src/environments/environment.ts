// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const apiUrl = 'http://localhost:3000/';
const firebaseConfig = {
  apiKey: 'AIzaSyAmKOXF1bREHdSiYBhW_a7m7JAAj__mvRU',
  authDomain: 'todo-d0bff.firebaseapp.com',
  databaseURL: 'https://todo-d0bff.firebaseio.com',
  projectId: 'todo-d0bff',
  storageBucket: 'todo-d0bff.appspot.com',
  messagingSenderId: '1028205983773'
};
export const environment = {
  production: false,
  apiUrl: apiUrl,
  firebaseConfig: firebaseConfig,
  firebaseDatabaseKeys: {
    todos: 'todos',
    done: 'done'
  }
};
