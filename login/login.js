  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getDatabase,ref,onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
  import { getAuth,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 


  const firebaseConfig = {
    apiKey: "AIzaSyCBHlV3JDoqZe4p0cucfVTzZliQYifb5UM",
    authDomain: "todo-fmp-a129f.firebaseapp.com",
    projectId: "todo-fmp-a129f",
    storageBucket: "todo-fmp-a129f.appspot.com",
    messagingSenderId: "729496089769",
    appId: "1:729496089769:web:333c62ba8f2b57779165b8"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();
  const auth = getAuth(app);



  var email = document.getElementById("email")
  var password = document.getElementById("password")


  window.handleSignin  = function(e){
    // console.log(e)
    console.log("check")
    e.preventDefault();

    signInWithEmailAndPassword(auth,email.value,password.value).then(function(response){
        console.log(response,"user")
     localStorage.setItem("user",JSON.stringify(response))
        alert("Success Login!")

        
        var id = response.user.uid
        // console.log(id)

        var reference = ref(database,`User/${id}`);
        onValue(reference,function(user){
            console.log(user.val())
        })
       
setTimeout(() => {
  
  window.location.href = `../todo/todo.html`
}, 3000);

        email.value = "",
        password.value = ""

    })
    .catch(function(error){
        console.log(error,"error")
        alert("Error Login!")
        alert("Try Again!")
    })




  }


 