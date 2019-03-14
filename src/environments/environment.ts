// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA6IU-MmG-aFcIJup3jycZSpVsPOm2O69k',
    authDomain: 'elottery-a1438.firebaseapp.com',
    databaseURL: 'https://elottery-a1438.firebaseio.com',
    projectId: 'elottery-a1438',
    storageBucket: 'elottery-a1438.appspot.com',
    messagingSenderId: '107318524180'
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
