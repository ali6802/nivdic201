export default {
   get() {
      //The text area - word search input
      this.inputField=document.getElementById('search-word');
      //Word search 'submit' button
      this.inputButton=document.getElementById('searchButton');
      //word of the day
      this.wordOfTheDay=document.getElementById('wordOfTheDay');
      //Box at which definition 'or lack thereof' is appended
      this.WOTDBox=document.getElementById('WOTDDefinitions');
      //word of the day definition
      this.WOTDDefinition=document.getElementById('WOTDDefinition');
      //submit button to more information
      this.WOTDButton=document.getElementById('WOTDbutton');
      //random word
      this.randomWord=document.getElementById('randomWord');
      //Box at which definition 'or lack thereof' is appended
      this.RWBox=document.getElementById('RWDefinitions');      
      //Submit button to more information
      this.RWButton=document.getElementById('RWbutton');
      //Generates a new random word
      this.NRWButton=document.getElementById('NRWbutton');         
   },
   actions(){
      //catches the word from the input field (text area)
      this.inputField.onkeydown=(e)=>{
         if (this.inputField.value.length>0&&e.key==="Enter") this.checkInput(this.inputField.value);          
      };
      //catches the ford from the input field (text area)
      this.inputButton.onclick=(e)=>{       
         if (this.inputField.value.length>0) this.checkInput(this.inputField.value);                 
      };
      //provides extensive information on the word of the day
      this.WOTDButton.onclick=(e)=>{
         localStorage.setItem("searchWord",localStorage.getItem("wordOfTheDay"));
         window.location.href='definitions.html'; 
      };
      //provides extensive information on the random word
      this.RWButton.onclick=(e)=>{
         if(RWDefinition.innerText.length>0)
         this.checkInput(this.randomWord.innerText);          
      };
      //generates a new random word
      this.NRWButton.onclick=(e)=>{
         this.loadRW();
      };
   }
}