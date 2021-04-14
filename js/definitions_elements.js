export default {
   get() {
      //Search word input
      this.inputField=document.getElementById('input-from-definition-page');
      //Search word submit button
      this.inputButton=document.getElementById('definition-page-button');
      //Word
      this.SWord=document.getElementById('SWord');
      //pronunciation
      this.SWPronunciation=document.getElementById('SWPronunciation');
      //hyphenation
      this.SWHyphenation=document.getElementById('SWHyphenation');
      //SW Definitions box
      this.SWDefinitions=document.getElementById('SWDefinitions');
      //SW Examples box
      this.SWExamples=document.getElementById('SWExamples');
      //
      this.synonymsRow=document.getElementById('synonyms-row');
   },
   actions() {     
      this.inputField.onkeydown= (e)=>{
         if (this.inputField.value.length>0&&e.key==="Enter") this.checkInput(this.inputField.value);         
      },
      this.inputButton.onclick= (e)=>{
         if (this.inputField.value.length>0) this.checkInput(this.inputField.value);      
      }       
   } 
}