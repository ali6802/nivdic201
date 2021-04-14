import elements from "./home_elements.js";
import {errorHandling, todayDate} from "./utilities.js";
import API from "./API.js";
export default {   
   date:"",
   start(){
      elements.get.call(this);
      elements.actions.call(this);     
      this.today();
      this.loadWOTD();         
   },
   today(){
      this.date=todayDate();
   },
   async loadWOTD(){      
      if(this.date==localStorage.getItem("WOTDLastdate")){
         let WOTDObj=JSON.parse(localStorage.getItem("wordOfTheDay"));
         this.wordOfTheDay.innerHTML=WOTDObj.word;
         this.WOTDDefinition.innerHTML=WOTDObj.definitions[0].text;        
      } else {
         let word = await API.wordOfTheDay();
         let definitions = await API.definitions(word);
         if(!Object.keys(word[0]).includes("error")&&!Object.keys(definitions[0]).includes("error")) {
            let string = JSON.stringify({word:word,definitions:definitions});
            localStorage.setItem("wordOfTheDay",string);
            localStorage.setItem("WOTDLastdate",this.date);
            this.wordOfTheDay.innerHTML=word;
            this.WOTDDefinition.innerHTML=definitions[0].text;
         }
      }      
   },
   async loadRW(){
      this.randomWord.innerHTML="";
      this.RWBox.innerHTML="";
      let word = await API.randomWord();            
      if(Object.keys(word[0]).includes("error")){
         this.randomWord.innerHTML="<span>Error 429: Too many requests<br>Retry later";
      } else {
         this.randomWord.innerHTML=word;
         let definitions = await API.definitions(word);
         if (Object.keys(definitions[0]).includes("error")){
            let err=errorHandling(404,"Definition");
            this.RWBox.appendChild(err);
         } else {
            let RWDefinition=document.createElement("p");
            RWDefinition.id="RWDefinition";
            RWDefinition.className="demo-definition";     
            RWDefinition.innerHTML=definitions[0].text;
            this.RWBox.appendChild(RWDefinition);           
         }         
      }
   },
   async checkInput(word){
      word=word.toLowerCase();
      let definitions= await API.definitions(word);  
      if(Object.keys(definitions[0]).includes("error")){    
        localStorage.setItem(`error${definitions[0].error}`,word);
        window.location.assign(`error${definitions[0].error}.html`);
      }
      else {
        let string=JSON.stringify({word:word,definitions:definitions});
        localStorage.setItem("searchWord",string);
        window.location.href='definitions.html';
      }
    }  
}