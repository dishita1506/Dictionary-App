var form=document.querySelector("form");
const resultDiv=document.querySelector('.result');

form.addEventListener('submit',(e)=>{
e.preventDefault();
findWord(form.elements[0].value);
})

async function findWord(word){

    try{
    const result=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)


    const data=await result.json();
    console.log(data);
  var definitions=data[0].meanings[0].definitions[0];
    resultDiv.innerHTML=`
    <h3><strong>Word: </strong>${data[0].word}</h3>
    <p id="pos">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning: </strong>${definitions.definition === undefined ? "Not Found" : definitions.definition }</p>
    <p><strong>Example: </strong>${definitions.example === undefined ? "Not Found":definitions.example}</p>
    <p><strong>Antonyms: </strong></p>
    `;
    if(definitions.antonyms.length===0){
        resultDiv.innerHTML+="<p>Antonyms not found</p>"
    }
    else{
        for(let i=0;i<definitions.antonyms.length;i++){
            resultDiv.innerHTML+=`<li>${definitions.antonyms[i]}</li>`;
        }
    }

    resultDiv.innerHTML+=`<button id="btn"><a href="${data[0].sourceUrls}" target="_blank">Read More</a></button>`
    }
    catch(error){
        resultDiv.innerHTML=`<p>Sorry, word could not be found!<p>`
    }
    //console.log(data);
    //alert("word is "+ word);
}