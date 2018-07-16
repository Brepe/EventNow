declare var firebase: any;
export class Fire {

    constructor (){

        var config = {
            apiKey: "xxxx",
            authDomain: "zzzz.firebaseapp.com",
            databaseURL: "https://zzzz.firebaseio.com",
            projectId: "zzzz",
            storageBucket: "zzzz.appspot.com",
            messagingSenderId: "241352714682"
          };
          firebase.initializeApp(config);
          
    
        }
}