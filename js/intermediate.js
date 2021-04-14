import API from "./API.js";
import {errorHandling} from "./utilities.js";

let WOTD=document.getElementById('wordOfTheDay');
let definitionbox=document.getElementById('WOTDDefinitions');
let WOTDDefinition=document.getElementById('WOTDDefinition');
//
let RW=document.getElementById('randomWord');
let definitionboxRW=document.getElementById('RWDefinitions');
let RWDefinition=document.getElementById('RWDefinition');
let NRWbutton=document.getElementById('NRWbutton');
//
let inputField=document.getElementById('search-word');
let inputButton=document.getElementById('searchButton');

let wordOfTheDay={word:"",definitions:[]};
let randomWord={word:"",definitions:[]};
let searchWord={word:"",definitions:[]};
let inputWord=undefined;

let testvar=2;


async function updateWOTD(){
  let word = await API.wordOfTheDay();     
  if(Object.keys(word[0]).includes("error")){
    //wordOfTheDay
    WOTD.innerHTML="<span>Error 429: Too many requests<br>Retry later";    
  }
  else{
    console.log(word);
    wordOfTheDay.word=word;
    //wordOfTheDay
    WOTD.innerText=word; 
    let definitions= await API.definitions(word);    
    if(Object.keys(definitions[0]).includes("error")){
      let err=errorHandling(definitions[0].error,"Definition");
      wordOfTheDay.definitions=definitions;
      definitionbox.appendChild(err);
    }  
    else {
      //definition
      wordOfTheDay.definitions=definitions;
      WOTDDefinition.innerHTML=definitions[0].text; 
    }          
  }
  console.log(wordOfTheDay); 
}
//
async function updateRW(){
  console.log(definitionboxRW);
  let word = await API.randomWord();     
  if(Object.keys(word[0]).includes("error")){
    //wordOfTheDay
    RW.innerHTML="<span>Error 429: Too many requests<br>Retry later";    
  }
  else{
    randomWord.word=word;
    //randomWord
    RW.innerText=word; 
    let definitions= await API.definitions(word);    
    if(Object.keys(definitions[0]).includes("error")){
      let err=errorHandling(definitions[0].error,"Definition");
      randomWord.definitions=definitions;
      definitionboxRW.appendChild(err);
    }  
    else {
      //definition
      randomWord.definitions=definitions;
      RWDefinition.innerHTML=definitions[0].text; 
    }          
  }
  console.log(randomWord);  
}
//updateRW();

async function checkInput(word){
  let definitions= await API.definitions(word);  
  if(Object.keys(definitions[0]).includes("error")){    
    localStorage.setItem(`error${definitions[0].error}`,word);
    window.location.assign(`error${definitions[0].error}.html`);
  }
  else {
    searchWord.word=word;
    searchWord.definitions=definitions;
    let string=JSON.stringify(searchWord);
    localStorage.setItem("searchWord",string);
    window.location.href='definitions.html';       
  }
}
inputField.onkeydown=(e)=>{
  if (e.key==="Enter"){
    checkInput(inputField.value);
  }  
}
;