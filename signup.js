  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getDatabase,set,ref } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
  import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
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



  var username = document.getElementById("username")
  var email = document.getElementById("email")
  var password = document.getElementById("password")


  window.handleSignup  = function(e){
    // console.log(e)
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth,email.value,password.value).then(function(response){
        console.log(response,"user")
        alert("Success Response!")

        var id = response.user.uid
        // console.log(id)

        set(ref(database,`User/${id}`),
        {
            userName: username.value,
            email: email.value,
            id: id
            
        })
        .then(function(response){
            console.log(response,"data")
            alert("Your data has been saved!")
            
           
        })
        .catch(function(error){
            console.log(error,"data error")
            alert("Your data has not saved")
            alert("Try Again!")
        })
        username.value = "",
        email.value = "",
        password.value = ""
        

        
        
        
        // if(username.length > 0 || email.length > 0 || password.length > 6 ){
          setTimeout(() => {
            
            window.location.href = `../login/login.html`
          }, 4000);
        // }
        
        
        
        // form.style.display = "none"

    })
    .catch(function(error){
      console.log(error,"error")
      alert("Error")
        alert("Try Again!")
    })


     
    //     // `<a href="../login/login.html"></a>`
        // btn.innerHTML = link
    // }




  }

//   window.handleTarget = function(){

//     var userName = document.getElementById("username").value
//     var Email = document.getElementById("email").value
//     var Password = document.getElementById("password").value
//     var link = document.getElementById("login-link")
//     var btn = document.getElementById("signup-btn")

//     if(userName.length > 0 || Email.length > 0 || Password.length > 6 ){
//         // `<a href="../login/login.html"></a>`
//         // btn.innerHTML = link
//         window.location.href = "../login/login.html"

//         // username.style.backgroundColor = "red"

//     }
//   }
//   handleTarget()