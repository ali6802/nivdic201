import {errorObj} from "./utilities.js";
//API Fetch options
export default {
   APIWord: "https://api.wordnik.com/v4/word.json/",
   APIWords: "https://api.wordnik.com/v4/words.json/",
   APIKey: "?api_key=rn9jkaqqwulfolcyyfwwnzmyblyvgb3cndu6izv5l8flzvjpm",
   //Word of the day
   wordOfTheDay(){
    return fetch(this.APIWords+"wordOfTheDay"+this.APIKey)
    .then(resp=>{
       if(resp.ok) return resp.json();
       else throw resp;       
   })
    .then(e=>e.word)
    .catch(err=>{return errorObj(err);});
   },
   //Random Word
   randomWord(){
    return fetch(this.APIWords+"randomWord"+this.APIKey)
    .then(resp=>{
        if(resp.ok) return resp.json();
        else throw resp;       
    })
    .then(e=>e.word)
    .catch(err=>{return errorObj(err);});
   },
   //Pronunciation
   pronunciation(word){
       return fetch(this.APIWord+word+"/pronunciations"+this.APIKey)
       .then(resp=>{
        if(resp.ok) return resp.json();
        else throw resp;       
    })
     .then(e=>e[0])
     .then(e=>e.raw)
     .catch(err=>{return "Pronunciation not found";});
   },
   //hyphenation
   hyphenation(word){
    return fetch(this.APIWord+word+"/hyphenation"+this.APIKey)
    .then(resp=>{
        if(resp.ok) return resp.json();
        else throw resp;       
    })    
    .then(data=>{
         return  data.reduce((accum, current,index)=>{
              if (current.type==undefined) accum+=current.text;
              else if (current.type=="stress") accum+="<span class='stress'>"+current.text+"</span>";
              else if (current.type=="secondary stress") accum+="<span class='secondaryStress'>"+current.text+"</span>";
              if (index<data.length-1) accum+=" - ";
              return accum;
         },"");          
    }).catch(err=>{return "Hyphenation not found"});  
   },
   //Synonyms
   synonyms(word){
    return fetch(this.APIWord+word+"/relatedWords"+this.APIKey)
    .then(resp=>{
        if(resp.ok) return resp.json();
        else throw resp;       
    }) 
    .then(data=>{
          let keys=['cross-reference','equivalent','same-context','synonym'];
          return data.reduce((accum,current)=>{
               if(keys.includes(current.relationshipType)) accum=accum.concat(current.words);
               return accum;
          },[]);      
     })
     .then(data=>data.filter(e=>e.length<18))
     .then(array=>Array.from(new Set(array)))
     .then(array=>array.map(e=>e.toLowerCase())).then(array=>array.sort())
     .catch(err=>{return errorObj(err);});
   },
   //definitions
   definitions(word,max=4) {
      return fetch(this.APIWord+word+"/definitions"+this.APIKey)
      .then(resp=>{
        if(resp.ok) return resp.json();
        else throw resp;       
    })
      .then((data)=>{
          //only accepts answers with part of speech and a text
          return data.filter(e=>e.partOfSpeech!=undefined&&e.text!=undefined);
      })
      .then((data)=>{
          let POSGROUP={};
          //allows only the a max number for each part of speech
          let filtered=data.reduce((accum,current)=>{
              if(!Object.keys(POSGROUP).includes(current.partOfSpeech)) {
                  POSGROUP[current.partOfSpeech]=max-1;
                  accum.push(current);
              } else if (POSGROUP[current.partOfSpeech]>0) {
                  accum.push(current);
                  POSGROUP[current.partOfSpeech]--;
              }
              return accum;
          },[]);
          return filtered;
      })     
      .then((data)=>{
          let keys=['attributionText','attributionUrl','partOfSpeech','text'];
          let newData=data.reduce((accum,definition)=>{
              let newRow=keys.reduce((row,key)=>{
                  row[key]=definition[key];
                  return row;
              },{});
              accum.push(newRow);
              return accum;            
          },[]);
          return newData;         
      }).catch(err=>{return errorObj(err);});      
   },
   //Examples
   examples(word){
    return fetch(this.APIWord+word+"/examples"+this.APIKey)
    .then(resp=>{
        if(resp.ok) return resp.json();
        else throw resp;       
    })
    .then(data=>data.examples)
    .then((data)=>{
        let keys=['text','author','title','url','year'];
        let newData=data.reduce((accum,definition)=>{
            let newRow=keys.reduce((row,key)=>{
                row[key]=definition[key];
                return row;
            },{});
            accum.push(newRow);
            return accum;            
        },[]);
        return newData;         
    })
    .then(data=>{
        let unique=[];
        let newData=data.reduce((accum,current)=>{
            if(!unique.includes(current.text)){
                unique.push(current.text);
                accum.push(current);                
            }
            return accum;
        },[]);
        return newData;
    })
    .then(data=>data.sort((a,b)=>b.year-a.year).sort((a,b)=>a.author-b.author))
    .catch(err=>{return errorObj(err);}); 
   }   
}
//

