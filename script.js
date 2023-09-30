// firebase-connection
import {
    getAuth,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
  import {
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    serverTimestamp,
  } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
  
  const firebaseConfig = {
      apiKey: "AIzaSyAmnjUZujEUwIrGiCrTWzmiSUCjG2jPaPs",
      authDomain: "notes-app-f25c6.firebaseapp.com",
      projectId: "notes-app-f25c6",
      storageBucket: "notes-app-f25c6.appspot.com",
      messagingSenderId: "937596555139",
      appId: "1:937596555139:web:b36ce9f45f5eca6bcb70b6",
      measurementId: "G-3QCHDK34JD"
    };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app); 

  

  onAuthStateChanged(auth, (user) => {
    if (user) {
      
    } else {
      window.location = "/login.html";
    }
  });

const textAreaDisplay= document.getElementById("dynamic_keep");
const addButton= document.getElementById("add_button");
const cancelButton= document.getElementById("cancelNote")
const nodesSafe= document.getElementById("mynotes_button");
const saveButton= document.getElementById("saveNote");
const myNotes= document.getElementById("myNotesid");

addButton.addEventListener("click", e=>{
    textAreaDisplay.style.display="";
    addButton.style.backgroundColor = "rgb(122, 25, 122)";
});

cancelButton.addEventListener("click", e=>{
    textAreaDisplay.style.display= "none";
    addButton.style.backgroundColor = "plum";
});

async function showNotes()
{
    document.getElementById("myNotesid").style.display= "";
    let userRef= doc(db,"users",auth.currentUser.email);
    let userDoc= await getDoc(userRef);
    let data= userDoc.data();
    // console.log(document);
    // console.log(data);
    let notes= data.notes;
    let keys= Object.keys(notes).sort().reverse();
    // console.log(keys);

    document.getElementById("myNotesid").innerHTML="";

    for(let key of keys)
    {
        let note= notes[key];
        // console.log(key, note);
        document.getElementById("myNotesid").innerHTML+=
        `<div class="noteStruct">
        <p>${key}</p>
        <p>${note}</p>
        </div>`;
    }
}

nodesSafe.addEventListener("click", e=>{
    const toNodesSafe= "./notes.html";
    textAreaDisplay.style.display= "none"; 
    myNotes.style.display= "";
    showNotes();
});

function convertDT()
{
  const b = new Date();
  const utc = b.getTime() + b.getTimezoneOffset() * 60000;
  const now = new Date(utc + 3600000 * "+5.5");
  let yy = now.getFullYear(),
    mm = now.getMonth() + 1,
    dd = now.getDate();
  if (mm < 10) mm = "0" + mm;
  if (dd < 10) dd = "0" + dd;
  let d = yy + "-" + mm + "-" + dd;
  let hr = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    ampm = "AM";
  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" +
+ sec;
  let t24 = hr + ":" + min + ":" + sec;
  if (Number(hr) >= 12) {
    ampm = "PM";
  }
  hr = ((Number(hr) + 11) % 12) + 1;
  if (hr < 10) hr = "0" + hr;
  let t = hr + ":" + min + ":" + sec;

  return d+'+'+t;
}

saveButton.addEventListener("click", e =>{
    let data=document.getElementById("newNote").value.trim();
    
    if(data)
    {
        // store this data to firebase
        updateDoc(doc(db,"users",auth.currentUser.email), {
            [`notes.${convertDT()}`]: data,
        })
        .then(e=>{
            document.getElementById("newNote").value= "";
            textAreaDisplay.style.display= "none";
            alert("Noted Saved!");
            showNotes();
        })     
        .catch(e=>{
            console.error(e);
            alert("Something went wrong!");
        });
    }
});