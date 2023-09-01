const textAreaDisplay= document.getElementById("dynamic_keep");
const addButton= document.getElementById("add_button");
const cancelButton= document.getElementById("cancelNote")
const nodesSafe= document.getElementById("mynotes_button");

addButton.addEventListener("click", e=>{
    textAreaDisplay.style.display="";
    addButton.style.backgroundColor = "rgb(122, 25, 122)";
});

cancelButton.addEventListener("click", e=>{
    textAreaDisplay.style.display= "none";
    addButton.style.backgroundColor = "plum";
});

nodesSafe.addEventListener("click", e=>{
    const toNodesSafe= "./notes.html";
    window.open(toNodesSafe,"_blank");
});