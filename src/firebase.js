import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyC4ubCbWzfDlCpJizcNoRyMOKv45xFG87U",
    authDomain: "reactapp-f7e6b.firebaseapp.com",
    databaseURL: "https://reactapp-f7e6b.firebaseio.com",
    projectId: "reactapp-f7e6b",
    storageBucket: "reactapp-f7e6b.appspot.com",
    messagingSenderId: "758039957373",
    appId: "1:758039957373:web:17d9b3b825bf6ebe60c614",
    measurementId: "G-8LDFHH4GSS"
  };

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        //Referenciando a database paraa acessar em outros locais
        this.app = app.database()

        this.storage = app.storage()
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut()
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)
    
        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    
    }

    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null
        }

        const uid = app.auth().currentUser.uid
        await app.database().ref('usuarios').child(uid)
            .once('value').then(callback)
    }


}

export default new Firebase()