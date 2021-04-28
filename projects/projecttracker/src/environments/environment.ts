// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // API_URL: "http://localhost:5000/api/",
  //API_URL: "http://api.knowledgetracker.in:8080/api/",
  API_URL: 'https://projecttracker-api.herokuapp.com/api/',
  ORG_ID: "spinsoft",
  //G_API_URL: "https://api.projecttracker.in/api",
  G_API_URL: "http://localhost:5000/api"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
