

const firebaseConfig = {
    apiKey: "AIzaSyDxVfBtHh9IM9XIi8YgSJa1BxbmarX-Bm4",
    authDomain: "my-todo-applictaion.firebaseapp.com",
    databaseURL: "https://my-todo-applictaion-default-rtdb.firebaseio.com",
    projectId: "my-todo-applictaion",
    storageBucket: "my-todo-applictaion.appspot.com",
    messagingSenderId: "355090392298",
    appId: "1:355090392298:web:6c8e91bcf9a0657e8da393"
  };
  

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

 var user = JSON.parse(localStorage.getItem("user"))
 var uid = user.user.uid
 console.log(uid)
var a = document.getElementById("main")
var b = document.getElementById("inp")
var c = document.getElementById("create-btn")
var d = document.getElementById("del-all")



 firebase.database().ref('Tasks').on('child_added',(data)=>{
    console.log(data.val())
    var cap = b.value.split(" ");
for (var i = 0; i < cap.length; i++){
    cap[i] = cap[i].slice(0,1).toUpperCase() + cap[i].slice(1).toLowerCase()

} 
cap = cap.join(" ")

var updatestr = cap.replace(/\s+/g, ' ').trim()

    
    var row = document.createElement("div")


    var btnEdit = document.createElement("button")
    btnEdit.innerHTML = "Edit"
     btnEdit.setAttribute("onclick","handleEdit(this)")
     btnEdit.setAttribute("class","btn")


    var btnDelete = document.createElement("button")
    btnDelete.innerHTML = "Delete"
    btnDelete.setAttribute("onclick","handleDelete(this)")
    btnDelete.setAttribute("class","btn")
    btnDelete.setAttribute('id',data.val().key)

    var btnUpdate = document.createElement("button")
    btnUpdate.innerHTML = "Update"
    btnUpdate.setAttribute("onclick","handleUpdate(this)")
    btnUpdate.setAttribute("class","btn")
    btnUpdate.setAttribute("id",data.val().key)



    var input = document.createElement("input")
    input.value = data.val().todo
    input.setAttribute("class","p1")
    a.appendChild(row)
    row.appendChild(input)
    row.appendChild(btnEdit)
    row.appendChild(btnDelete)
    row.appendChild(btnUpdate)

    // b.value = null
    input.disabled = true
    btnUpdate.disabled = true
    btnUpdate.innerHTML = "<s>Update</s>"
    btnUpdate.style.opacity = ".3"

    // val.disabled = true
    d.disabled = false
    b.value = ""
      
    //   var dataArr = push[data.val()]
    //   console.log(dataArr)
 })




window.handleInp = function (val) {
 c.disabled = false

 if(b.value == ""){
    c.disabled = true
}

const inputElement = document.getElementById('inp');

inputElement.addEventListener('input', function() {
    const inputValue = this.value;

    // Check if the input consists only of spaces
    if (/^\s+$/.test(inputValue)) {
        // Set the cursor position to the beginning
        this.setSelectionRange(0, 0);
    }
});


    
}




window.createElem = function (val) {
  
    


    var key = firebase.database().ref('Tasks').push().key

 var obj = {
    todo:b.value,
      key:key,
      userId:uid
}

  firebase.database().ref('Tasks').child(key).set(obj)
   
       
   
}


window.handleEdit =function (val) {
    val.parentElement.childNodes[0].disabled = false
    val.parentElement.childNodes[1].style.opacity = ".3"
    val.parentElement.childNodes[1].innerHTML = "<s>Edit</s>"
    val.parentElement.childNodes[1].disabled = true

    val.parentElement.childNodes[3].disabled = false
    val.parentElement.childNodes[3].style.opacity = "10"
    val.parentElement.childNodes[3].innerHTML = "Update"
    
}

window.handleUpdate =function (val) {
    val.parentElement.childNodes[0].disabled = true
    val.parentElement.childNodes[1].style.opacity = "10"
    val.parentElement.childNodes[1].innerHTML = "Edit"
    val.parentElement.childNodes[1].disabled = false

    
    var x = val.parentElement.childNodes[0]
    var editstr = x.value.replace(/\s+/g, ' ')
    
    var updateObj = {
        todo:x.value = editstr,
        key:val.id
    }
//  console.log(val.id)
    firebase.database().ref('Tasks').child(val.id).set(updateObj)

    val.parentElement.childNodes[3].disabled = true
    val.parentElement.childNodes[3].style.opacity = ".3"
    val.parentElement.childNodes[3].innerHTML = "<s>Update</s>"
    
}

window.handleDelete =function (val) {
          
         val.parentNode.remove()
    
        
        firebase.database().ref('Tasks').child(val.id).remove()
      
    
     
}

window.deleteAll =function (val) {
    a.innerHTML = ""   
    d.disabled = true
    // console.log(data.val())
    firebase.database().ref('Tasks').remove()

}



     
