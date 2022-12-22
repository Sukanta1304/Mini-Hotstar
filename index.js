let id ;

async function searchmovie(){
    // https://omdbapi.com/?apikey=2b79427&s=The%20kashmir%20files
   try {
       const q= document.getElementById('input').value ;
       const res= await fetch(`https://omdbapi.com/?apikey=2b79427&s=${q}`)
       const data= await res.json() 
       const movies= data.Search ;
       return movies
   } catch(err){
       console.log(err)
   }
}

function append(data){
    document.getElementById('movies').innerHTML=null ;
    data.forEach(function(el){
        let name = document.createElement('p');
        name.innerText= el.Title;
        name.style.backgroundColor="white";
        name.style.textOverflow="scroll"
        name.addEventListener("click",function(){
            showmovie(el)
        })
        let img= document.createElement('img') 
        img.src= el.Poster;

        document.getElementById('movies').append(img,name)
    });
}
async function main(){
    let data= await searchmovie() ;

    if(data==undefined){
        return false ;
    }
    append(data)
}
function debounce(func,delay){
    if(id){
        clearTimeout(id);
    }
    id= setTimeout(function(){
        func()
    },delay)

}

function showmovie(el){
    document.getElementById("show_movies").innerHTML=null;
        let div= document.createElement("div") ;
        let poster= document.createElement("img") ;
        poster.src= el.Poster;
        let name= document.createElement("h3") ;
        name.innerText=`Movie: ${el.Title}`;
        let year= document.createElement("p") ;
        year.innerText=`Releasing Year: ${el.Year}`;
        let rating= document.createElement("p") ;
        rating.innerText=`IMDb Rating:${el.imdbID}`;

        div.append(poster,name,year,rating);
        document.getElementById("show_movies").append(div)
    }