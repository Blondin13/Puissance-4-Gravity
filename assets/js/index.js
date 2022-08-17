//---------------------------------------------MES VARIABLES----------------------------------------------------//
let flecheSelect = '<img src="./assets/img/flecheselect.png">';
let jetonJaune = '<img src="./assets/img/jetonjaune.png">';
let jetonRouge = '<img src="./assets/img/jetonrouge.png">';
let imgTrait   = '<img src="./assets/img/trait.png">';
let array = document.querySelectorAll("table td");
let win = false;
let lap = 1;
let gameModeCpu = false;
//-----------------------------TABLEAUX---------------------------------//
const graviteJeton = [
  [0,   1,  2,  3,  4,  5,  6],
  [7,   8,  9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, 32, 33, 34],
  [35, 36, 37, 38, 39, 40, 41]

];
  
const victoryConditions = [
  // Horizontale
  [ 0,  1,  2,  3], [ 1,  2,  3,  4], [ 2,  3,  4,  5], [ 3,  4,  5,  6],
  [ 7,  8,  9, 10], [ 8,  9, 10, 11], [ 9, 10, 11, 12], [10, 11, 12, 13],
  [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
  [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
  [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
  [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],

  // Verticale
  [ 0,  7, 14, 21], [ 7, 14, 21, 28], [14, 21, 28, 35], [ 1,  8, 15, 22],
  [ 8, 15, 22, 29], [15, 22, 29, 36], [2 ,  9, 16, 23], [ 9, 16, 23, 30],
  [16, 23, 30, 37], [ 3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
  [ 4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39], [ 5, 12, 19, 26],
  [12, 19, 26, 33], [19, 26 ,33, 40], [ 6, 13, 20, 27], [13, 20, 27, 34],
  [20, 27, 34, 41],
  // Diagonale
  [ 3,  9, 15, 21], [ 4, 10, 16, 22], [10, 16, 22, 28], [ 5, 11, 17, 23],
  [11, 17, 23, 29], [17, 23, 29, 35], [ 6, 12, 18, 24], [12, 18, 24, 30],
  [18, 24, 30, 36], [13, 19, 25, 31], [19, 25, 31, 37], [20, 26, 32, 38],
  [ 0,  8, 16, 24], [ 8, 16, 24, 32], [16, 24, 32, 40], [ 7, 15, 23, 31],
  [15, 23, 31, 39], [14, 22, 30, 38], [ 1,  9, 17, 25], [ 9, 17, 25, 33],
  [17, 25, 33, 41], [ 3, 11, 19, 27],
];

//---------------------------------------------FLECHE-SELECT---------------------------------------------------//
document.onmousemove = function(e){
  if(!e){
    var e = (document.getElementById("div-fleche-select")).event;
  };
    var mX = parseInt(e.pageX ? e.pageX : e.clientX, 10);
    var mY = parseInt(e.pageY ? e.pageY : e.clientY, 10);
   
  if(document.getElementById("div-fleche-select")){
        mX += document.documentElement.scrollLeft;
        mY += document.documentElement.scrollTop;
  };
      //mX = Math.min(Math.max(540, mX), 800 + 520); // LIMITE MA FLECHE A LA TAILLE DE MA DIV "590 TAILLE ASIDE"
        mX = Math.min(Math.max(100, mX), 1800);
   
        document.getElementById("curseur").style.left = mX + 'px';
};

//-----------------------------FONCTION-SONG---------------------------------//
const bruitJeton = () => {
    const audio = new Audio();
    audio.src = "./assets/mp3/jeton.mp3";
    audio.play();
};

const aplau = () => {
    const audio = new Audio();
    audio.src = "./assets/mp3/motus.mp3";
    audio.play();
};

//---------------------------FONCTION-GRAVITER-------------------------------//
function gravity(child){
  let result;
  let parent = child.parentNode;
  let index = Array.prototype.indexOf.call(parent.children, child);
    for (let i = graviteJeton.length - 1; i > -1; i--){
      result = document.querySelectorAll('td')[graviteJeton[i][index]];
      if(result.innerHTML != ""){
        continue;
      };
      break;
    };
  return result;
};

//---------------FONCTION play(jetonJaune ou jetonRouge)---------------------//
function play(element){
  let cell = gravity(element);
    if(!win && element.innerHTML === ''){
      if(lap % 2 !== 0 ){
        cell.innerHTML = jetonJaune;
          bruitJeton();
          testGain();
        if(win){
          return;
        }
      }else{
        cell.innerHTML = jetonRouge;
      };
          lap++;

      if(!win && gameModeCpu && lap % 2 == 0 ){
          ia();
      };
          bruitJeton(); 
          testGain();
    };
};

//--------------------------FONCTION GAIN------------------------------------//
function testGain(){
for(let i = 0; i < victoryConditions.length; i++){
  let firstCase = array[victoryConditions[i][0]];
  let secondCase = array[victoryConditions[i][1]];
  let thirdCase = array[victoryConditions[i][2]];
  let fourthCase = array[victoryConditions[i][3]];

  if(firstCase.innerHTML == "" || secondCase.innerHTML == "" || thirdCase.innerHTML == "" || fourthCase.innerHTML == ""){
      continue;
  }

  if(firstCase.innerHTML == secondCase.innerHTML && secondCase.innerHTML == thirdCase.innerHTML && thirdCase.innerHTML == fourthCase.innerHTML){

    //------------Animation-------------//
      firstCase.classList.add("anim");  
      secondCase.classList.add("anim");
      thirdCase.classList.add("anim");
      fourthCase.classList.add("anim"); 
    //----------------------------------//

    if(firstCase.innerHTML == jetonRouge){

      document.querySelector("#gagnant").innerHTML = "Le joueur 2 gagne";
      document.querySelector("#gagnant").classList.add("anim");
      document.getElementById("score2").innerHTML += imgTrait;
      win = true;
      
    }else if(firstCase.innerHTML == jetonJaune){

      document.querySelector("#gagnant").innerHTML = "Le joueur 1 gagne";
      document.querySelector("#gagnant").classList.add("anim");
      document.getElementById("score1").innerHTML += imgTrait;
      win = true;
    }
    aplau();
  };
};
  if(!win){
  checkTie();
  };    
};

//------------------------FONCTION MATCH NULL----------6---------------------//
function checkTie(){
  let count = 0;
    for(let i = 0; i < array.length; i++){
      if(array[i].innerHTML != ""){
        count++;
      };
    };
      if(count === 42){
        document.querySelector("#gagnant").innerHTML = "Partie nul !!!!";
        document.querySelector("#gagnant").classList.add("anim");
        win = true;
      };
};

//---------------------FONCTION NOUVELLE PARTIE------------------------------//
function newsGame(){
    array.forEach(function(value){
      value.innerHTML = "";
      value.classList.remove("anim");
    });
    document.querySelector("#gagnant").innerHTML = "QUI SERA LE GAGNANT ???";
    document.querySelector("#gagnant").classList.remove("anim");
    win = false;
    lap = 1;
};

//----------------------FONCTION RANDOM-(I.A)--------------------------------//
function ia(){
  for(let i = 0; i < array.length; i++){
let rand = getRandom(0, array.length -1)
    if(array[rand].innerHTML === ''){
      setTimeout(function(){
        let cell = gravity(array[rand]);
        cell.innerHTML = jetonRouge;
        testGain();
      },300);
      lap++;
      break;
    };
  };
};
// La fonction random
function getRandom(min, max){    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//-------------------FONCTION JOUER CONTRE CPU-------------------------------//
function playCpu(){
    gameModeCpu = true;
};