import elements from "./definitions_elements.js";
import API from "./API.js";
import {definitionBox, exampleBox, synonymBox, errorHandling} from "./utilities.js";
export default {
   searchWord:"",
   definitions:[],
   updatePage(){
      elements.get.call(this);
      elements.actions.call(this);
      this.getSWObj();
      this.loadSearchWord();
      this.loadPronunciation();
      this.loadHyphenation();
      this.loadDefinitions();
      this.loadExamples();
      this.loadSynonyms();      
   },
   getSWObj(){
      let SWObj=JSON.parse(localStorage.getItem("searchWord"));
      this.searchWord=SWObj.word;
      this.definitions=SWObj.definitions;      
   },
   loadSearchWord(){      
      this.SWord.innerHTML=this.searchWord;
   },
   loadDefinitions(){
      this.definitions.forEach((e,i)=>{
         let box=definitionBox(e,i);
         this.SWDefinitions.appendChild(box);
      });      
   },
   async loadPronunciation(){
      let pronunciation= await API.pronunciation(this.searchWord);           
      if(pronunciation!="Pronunciation not found"){
         this.SWPronunciation.innerHTML=`[<i>${pronunciation}</i>]`;
      }      
   },
   async loadHyphenation(){
      let hyphenation = await API.hyphenation(this.searchWord);
      console.log(hyphenation);
      if(hyphenation!="Hyphenation not found"){
         this.SWHyphenation.innerHTML=`[${hyphenation}]`;
      }
   },
   async loadExamples(){
      let examples = await API.examples(this.searchWord);
      if(Object.keys(examples[0]).includes("error")){
         let err=errorHandling(examples[0].error,"Examples");
         this.SWExamples.appendChild(err);
      } else {
         examples.forEach((e,i)=>{
            let box=exampleBox(e,i);
            this.SWExamples.appendChild(box);
         });
      }
   },
   async loadSynonyms(){
      let synonyms = await API.synonyms(this.searchWord);
      if(!Object.keys(synonyms[0]).includes("error")){
         synonyms.forEach((e)=>{
            let box=synonymBox(e,this.checkInput);
            this.synonymsRow.appendChild(box);           
         });
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
        window.location.assign("definitions.html");        
      }
    }  
}