// BEISPIEL UND AUFGABE:
// Dieses Skript soll als Beispiel dazu dienen, wie Interfaces und Arrays genutzt werden können.
// Hier wird ein ungefährer Aufbau eines simplen Klick-Spiels gezeigt. Der Nutzer kann dabei durch Button ein neues Monster erstellen.
// Zu beginn werden hier zuerst Interfaces, danach Variablen deklariert.
// Weiter unten kommen dann die Funktionen.

// EINGEBAUTE FEHLER: Innerhalb jedes Programmteiles wurden ein paar fiese Fehler eingebaut!
// Diese werden vermutlich erst in der Browser-Konsole angezeigt. 
// Testet also alle Funktionen, jeden Button welchen ihr finden könnt!
// Hilfe: Benutzt auf Verdacht ein Konsolen-Log oder ruft die Variable in der Konsole des Browsers auf.
// Hilfe2: Betrachtet den umliegenden Code. Trackt die Werte von Variablen, falls euch etwas komisch vorkommt!

// ------- interfaces --------- //
// INSGESAMT EINGEBAUTE FEHLER beu den interfaces: Keine. (0 / null)

// Monster sind vielfältig und können sehr unterschiedlich sein. Dennoch werden sie durch allgemeine Attribute, wie Name und Lebenspunkte, vereint.
// Deshalb wird hier ein interface genutzt!
// Ein interface erlaubt das erstellen von einem ungefährem Haupt-Objekt.
// Object = Komplexer Datentyp auf Grundlage primitiver Datentypen

interface Monster {
    monsterName : string; // Name des Monsters
    monsterHealthPoints : number; // Lebenspunkte
    monsterExperience : number; // Erfahrungspunkte bei besiegen des Monsters
    monsterModifier : string []; // Monster-Verstärker. Diese sind in diesem Fall nur Text! (Da hier einfacher Zufall für die Auswahl genutzt wird, kann der gleiche Eintrag auch doppelt vorkommen)
    monsterBilder: string;     //Bilder
    monsterAge: number;  //Alter der Monster
    monsterlevel: number; // Level für monster
}


// ------- Variablen -------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Variablen: I (1 / einer)

let bildpfad : string;

let monsterHolder : string = "monsterHoldingCell";                                  // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.

let playerName : string = "Spielername";                                            // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP : number = 0;                                         ///Fehler 1 gefunden                 // Stellt die gesammelte Erfahrung des Spielers dar.
let playerXPperLevel : number = 500;                                                // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
let playerObjects: string;
let playerLevel : number= 1;


// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let prefix : string[] = ["Wald-", "Seuchen-", "Uralte(s) ", "Gift-", "Brennende(s) ", "Kniescheibenzertrümmernde(s) ", "freundliche(s) ", "schmutzige(s) ", "alte(s) ", "singende(s)"]; // length = 10, da 10 Einträge. Von 0-9.
let monsterName : string[] = [" Ungeziefer", " Kaninchen", " Känguru", " Krokodil", " Quietschentchen", " Kamel", " Einhorn"]; // length = 3, da 3 Einträge. Von 0-2.
let suffix : string[] = [" des Verderbens", " aus der Hölle", " der Lethalität", " mit Rheuma", " der Redundanz", " der Zerberstung", " von neben an", " aus Amerika ", " aus der Hölle ", " mit Krücken ", " aus dem Niemandsland "]; // length = 6, da hier 6 Einträge sind. Von 0-5.

let monsterModifers : string[] = ["Ist nervig", "Linkshänder", "Bier-Connoisseur", "Verfehlt häufig", "Prokrastiniert", "Müde", "Verwirrt", "Wasserscheu", "Bipolar", "Hat Schnupfen", "Verläuft sich oft"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster.

let monsterBilder: string[] = ["imgs/i.png", "imgs/h.png", "imgs/b.png", "imgs/m.jpg", "imgs/t.jpg", "imgs/k.jpg", "imgs/elefant.png", "imgs/loewe.png", "imgs/pinguin.png"];
let monsterSrc : string[] = imagePush();

let monsterAge: number[] = [100, 543, 1001, 23647,12,6];



// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray : Monster[] = []; // Das Haupt-Array wurde erstellt und initialisiert!
console.log(monsterArray ); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.


// ----------- Funktionen ----------- //
// INSGESAMT EINGEBAUTE FEHLER bei den Funktionen: IIIII (5 / fünf)

// Generelle onload-funktion um Event-Listener zum Dokument hinzuzufügen
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel(0); // Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
    console.log("" + document.getElementById("monsterSpawner").innerHTML);

    document.getElementById("fightAll").addEventListener('click', fightAllMonsters, false);
    document.getElementById("fightWeak").addEventListener('click', fightAllWeakMonsters, false);
    document.getElementById("fightWeakest").addEventListener('click', fightWeakestMonster, false);
}

// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster()
{
    let monsterNumber : number = getRNGNumber(3) + 1;       //neue Monster werden erzeugt (Zufallszahl von 1-3)

    for (let i : number = 0; i < monsterNumber; i++){

    let newMonsterName : string = generateMonsterName();                // Eigens-gebaute Funktion, welche einen string zurück gibt.
    let newMonsterHP : number = generateMonsterHitPoints();             // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterXP : number = generateMonsterXP();                    // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
    let newMonsterModifier : string[] = generateMonsterModifer();       // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
    
    let newMonsterAge : number = generateMonsterAge();
    let newMonsterBilder: string = generateMonsterBilder();
    let newMonsterlevel: number = generatemonsterlevel();

    let newMonster : Monster = {                                        // Monster wird erstellt.
        monsterName : newMonsterName, 
        monsterHealthPoints : newMonsterHP,
        monsterExperience : newMonsterXP,
        monsterModifier : newMonsterModifier,
        monsterAge: newMonsterAge,
        monsterBilder: newMonsterBilder,
        monsterlevel: newMonsterlevel,

    //monsterMoney : 0, Fehler 2 gefunden
    };

    monsterArray.push(newMonster);                                      // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
    console.log(monsterArray[0].monsterExperience);          //Fehler 3 gefunden                 // Man kann nur auf Array-Teile zugreifen, welche definiert sind. -1 ist nicht definitiert (und wird es auch nie sein).
    updateHTML();
   }                                           
}

// Funktion monstergenerateHTMLAll einfügen

function monsterGenerateHTMLAll()
{
    for (let i : number = 0; i < monsterArray.length; i++) {
        monsterGenerateHTML(i);
    }
}
function getMonsterCount() : number
{
    let monsterCount : number = monsterArray.length;
    return monsterCount;
}

 //Update der Functionen

 function fightAllMonsters()
 {
        for(let i:number=monsterArray.length-1; i >= 0; i--){
            fightMonster(i);
        }
    }

function fightAllWeakMonsters()
    {
        for(let i:number=monsterArray.length-1; i >= 0; i--){
            if (monsterArray[i].monsterlevel <= playerLevel)
            fightMonster(i);
        }
    }
function fightWeakestMonster()
    {
        let tempWeakestMonsterNr : number = 0;
    
        for(let i:number = 0; i < monsterArray.length; i++){
            if(monsterArray[i].monsterlevel < monsterArray[tempWeakestMonsterNr].monsterlevel)
            tempWeakestMonsterNr = i;
        }
        fightMonster(tempWeakestMonsterNr);
    }
    

// Update HTML 

function updateHTML()
{
    clearMonsterCell();
    monsterGenerateHTMLAll();
    getMonsterCount();
}
// Monster Cell

function clearMonsterCell()
{   console.log(monsterArray);
    for (let i : number = 0; i <= monsterArray.length; i++){
        if (document.getElementById("monster" + (i+1)) != null){
            var element = document.getElementById("monster" + (i+1));
            element.parentNode.removeChild(element);
        }
    } 
    console.log(monsterArray);
}

function imagePush() : string[]
{
    let src : string[] = [];
    console.log(src);
    for (let i = 1; i<=50; i++){
        let path : string = "monster" + i + "png";
        src.push(path);
        console.log(src);
    }
    return src;
}



// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(monsterArrayPosition : number)
{
    let holdingDiv : HTMLElement = document.createElement("div");       // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + monsterArrayPosition + 1);     // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster");                        // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv);     // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"

    let monsterName : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterName.innerHTML = monsterArray[monsterArrayPosition].monsterName;                     // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName);                                // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterMod : HTMLElement = document.createElement("p");        // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[monsterArrayPosition].monsterModifier[0] + ", " +  monsterArray[monsterArrayPosition].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod);                                // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

    let monsterImg : HTMLElement = document.createElement("img");       // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", monsterArray[monsterArrayPosition].monsterBilder);                 // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster");            // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg);                                 // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)

    let monsterBtn : HTMLElement = document.createElement("BUTTON");    // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen?";                        // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn);

 // Monsterlevel

    let monsterlev : HTMLElement = document.createElement("p"); 
    monsterlev.innerHTML = "Level: " + monsterArray[monsterArrayPosition].monsterlevel;
    holdingDiv.appendChild(monsterlev);

    let monsterXP : HTMLElement = document.createElement("p"); 
    monsterXP.innerHTML = "XP: " + monsterArray[monsterArrayPosition].monsterExperience;
    holdingDiv.appendChild(monsterXP);
                  
    console.log("Aktuelle Anzahl an Monstern: " + monsterArrayPosition + 1);

    monsterBtn.addEventListener(                                        // Füge dem Monster eine Funktion hinzu.
        'click', function() {                                           // Wird bei Maus-Click ausgelöst.
            fightMonster(monsterArrayPosition);                                 // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
        }, false);                                                      // Ignoriert das false.
}


// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [ ] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber : number) : number
{
    return Math.floor(Math.random() * _maxNumber);
}


// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() : string
{
    let generatedMonsterName : string = ""; // Erstelle einen leeren String für das Monster

    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber : number = getRNGNumber(prefix.length);               // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber];                           // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length);                       // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber];          //Fehler 5 gefunden                            // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
 
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length);                            // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber];                          // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

    return generatedMonsterName;
}


// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP : number = 1 + getRNGNumber(10);
    return tempMonsterHP;
}


// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 350) + 100 zurück.
    let tempMonsterXP : number = 100 + getRNGNumber(420);
    return tempMonsterXP;
}

// Definiert Alter des Monsters.
function generateMonsterAge() : number
{
    let tempMonsterAge : number = monsterAge[getRNGNumber(monsterAge.length)];
    return tempMonsterAge;
}
function generatemonsterlevel() : number
{
    return getRNGNumber(11);
 }

// Definiert die verschiedenen Bilder der Monster
function generateMonsterBilder() : string
{
    let tempMonsterBilder : string = monsterBilder[getRNGNumber(monsterBilder.length)];
    return tempMonsterBilder;
}

function generateMonsterHealthPoints() : number
{
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP : number = 1 + getRNGNumber(5);
    return tempMonsterHP;
}
function generateMonsterImage() : string
{
    let rngNumber : number = getRNGNumber(monsterSrc.length);
    let generatedMonsterImage : string = monsterSrc[rngNumber];
    return generatedMonsterImage;
}

// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() : string[]
{
    let tempMonsterMod : string[] = [];                                         // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod;                                                      // Gebe das hier zusammengesetzte Array wieder zurück.
}


// Aufgerufen, wenn man auf den Button klickt.
// Der Spieler kämpft gegen das entsprechende Monster. Er erhält dann Erfahrungspunkte.
function fightMonster(_index : number)
{
    {
        console.log(monsterArray);
    
        if (playerLevel > monsterArray[_index].monsterlevel){
            if (monsterArray[_index].monsterHealthPoints == 1){
                console.log("Spieler kämpft gegen Monster und gewinnt!");
                updateplayerLevel(monsterArray[_index].monsterExperience);
                monsterArray.splice(_index,1);
                updateHTML();
            }
            else {
                console.log("Monster verliert einen Lebenspunkt!");
                monsterArray[_index].monsterHealthPoints -= 1;
                updateHTML();
            }
        }
        else if(playerLevel < monsterArray[_index].monsterlevel){
            console.log("Das Monster weigert sich zu verschwinden.");
            updateplayerLevel( - monsterArray[_index].monsterExperience);
        }
    }
    
    
    // Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
    function updateplayerLevel(XPchange : number)
    {
        let oldplayerLevel : number = playerLevel;
        if ((playerXP + XPchange) <= 0){
            playerXP = 0;
        }
        else{
            playerXP += XPchange;
        }
    
        if ((Math.floor(playerXP / playerXPperLevel) + 1) >= 1){
            playerLevel = Math.floor(playerXP / playerXPperLevel) + 1;
        }
        let extendedXP : number = playerXPperLevel * playerLevel;
    
        document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLevel + " (XP: " + playerXP + " / " + extendedXP + ")";       // Baue den String für die Spieler-Info zusammen
        console.log("Spieler " + playerName + " hat nun Level " + playerLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)");        // Spieler-Level in der Konsole.
    
        if (playerLevel == 20 && playerLevel > oldplayerLevel){
            alert("Level 20! Du hast gewonnen!");
        }
    }