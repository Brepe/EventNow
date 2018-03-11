declare var firebase: any;
export class Fire {

    constructor (){

        var config = {
            apiKey: "AIzaSyDvXaxJqvlH_84DrxytYNF341Ax67H1OU8",
            authDomain: "geoloc-179420.firebaseapp.com",
            databaseURL: "https://geoloc-179420.firebaseio.com",
            projectId: "geoloc-179420",
            storageBucket: "geoloc-179420.appspot.com",
            messagingSenderId: "241352714682"
          };
          firebase.initializeApp(config);
          
    
        }
}