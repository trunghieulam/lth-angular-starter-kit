// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDnGq_NZ60497AQuE9GWvGg8RpVQbG7SUE',
    authDomain: 'lth-starter-kit.firebaseapp.com',
    databaseURL: 'https://lth-starter-kit.firebaseio.com',
    projectId: 'lth-starter-kit',
    storageBucket: 'lth-starter-kit.appspot.com',
    messagingSenderId: '830681468056'
  },
  serverUrl: 'http://localhost:{{port}}'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
