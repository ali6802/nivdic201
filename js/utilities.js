import API from "./API.js";
//errorObj
const errorObj = function(err){
   let errorObj = (()=>err.json())()
        .then(err=>err.message=="Not found"?[{error:404,message:"Not found"}]:[{error:429,message:"Too many requests"}]);
   console.error(err.message);      
   return errorObj; 
}
//errorHandling
const errorHandling= function(error,parameter){
   let parent=document.createElement("div");
   let img=document.createElement("img");
   let text=document.createElement("h3");
   parent.className=`message-${error}`;   
   img.src=`../img/error${error}.png`;
   text.innerText=error==404 ? `${parameter} not found` : "retry later";
   parent.appendChild(img);
   parent.appendChild(text);
   return parent;
}
const todayDate = function(){
   let today = new Date();
   return `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
}
//definitionBox
const definitionBox = function(def,index){
   //elements
   let box=document.createElement("div");
   let text=document.createElement("p");
   let reference=document.createElement("a");
   //elements attributes
   box.className="definition-box";   
   text.className="definition-text";
   reference.className="reference";
   reference.href=def.attributionUrl;
   //
   text.innerHTML=`[${index+1}]: <i>(${def.partOfSpeech})</i> `+def.text;
   reference.innerHTML=def.attributionText;
   box.appendChild(text);
   box.appendChild(reference);
   return box;
}
//exampleBox
const exampleBox = function(example,index){
   let box=document.createElement("div");
   let text=document.createElement("p");
   let reference=document.createElement("a");
   let author=document.createElement("h6");
   //
   box.className="example-box";
   text.className="example-text";
   reference.className="reference";
   author.className="example-author";
   //
   text.innerHTML=`[${index+1}]: `+example.text;
   reference.href=example.url;
   reference.innerHTML=example.title;
   author.innerHTML=(example.author!=undefined ? example.author:"Anonymous")+(example.year!=undefined ?`, (${example.year})`:", (n.d.)");   
   //
   box.appendChild(text);
   box.appendChild(reference);
   box.appendChild(author);
   return box;
}
//
const synonymBox = function(synonym,callback){
   let synonymBox = document.createElement("li");
   let synonymLink = document.createElement("a");
   //
   synonymBox.className="col s6 m4 l2 synonym-box";
   synonymLink.innerHTML=synonym;
   synonymLink.href="#top";
   //
   synonymBox.onclick=(e)=>{
      callback(synonym);
   };
   //
   synonymBox.appendChild(synonymLink);
   return synonymBox;   
}
//
export {errorObj, errorHandling, todayDate, definitionBox, exampleBox, synonymBox};