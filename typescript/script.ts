//Konsolenaufgabe (1)
var message1 = "Hello World";
console.log(message1);

//mehrere Funktionen (2)
//Webseite geladen alert
window.onload = function pageLoaded() {
    alert("Die Webseite wird geladen... Bitte warten!")
}

//Klick auf ein Bild (3)
function clickImage() {
    alert("Oops, dass war der falsche Button!")
}

//Eventlistener (4)
//Klasse eines HTML Elements ändern (5)
window.onclick = function (){
document.getElementById("a").addEventListener("click", onClick)}
function onClick(){
    document.getElementById("a").innerHTML = "mmh Toast ;)"

 }
 //Klasse eines HTML Elements ändern (5)
 document.getElementById("Guten Appetit").addEventListener("click", ka )
 function ka(){
    document.getElementById("Guten Appetit").className = "Dankeschön"
 }

 // "string" und "number" in Funktion benutzen (6)
function rechnung() {
    let num1: number = 2;
    let num2 : number = 3;
    let  str1 : string = "Hal";
    let str2 : string = "lo";
}

//weist einer deklarierten Variable einen neuen Wert zu (7)
let var1: number = 1;
var1 = 2;


// Rechnungen und Konsolenausgabe (8)
let x:number, y:number, z:number;
 x = 2;
 y = 3;
 z = x + y;
console.log(z)

let a:string, b:string, c:string;
 a = "Hallo "
 b = "Wie gehts?"
 c = a + b;
console.log(c)

function rechnen(){
console.log(a+b)
console.log(x+a)
}

// Erstellen neuer HTML-Elemente (9)
document.getElementById("c").addEventListener("click", createButton)
function createButton(){
    let testbutton:HTMLElement = document.createElement("button");
    testbutton.innerHTML = "Neuer Button";
    testbutton.addEventListener("click", createButton);
    document.getElementById("c").appendChild(testbutton);
}

