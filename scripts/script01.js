document.getElementById("forms").addEventListener("click", function(event){
  event.preventDefault()
});

function calculaDivsBackbones(){
  console.log("aa");
    let numBackbones = document.getElementById("numbackBones").value;
    localStorage.setItem("numBackbones", numBackbones);
    window.location.href = "main.html";
}