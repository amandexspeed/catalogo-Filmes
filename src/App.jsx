import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
 

function App() {
  const [count, setCount] = useState(0)

  const key = "f7b894bff44fb2729cd01bacffb56c0e";
  
  async function loadData(){

      var input = document.getElementById("titulo");
      var name = input.value
      var list = document.getElementById("lista");
      console.log(document.getElementById("lista"));

      var data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&language=pt-BR&api_key=${key}`).then(Response=>Response.json());
      
      var resultados = document.querySelector(".resultado");
      var divMãe = document.querySelector(".filmesPopulares");

      console.log(resultados);
      console.log(divMãe);

      divMãe.classList.remove("load");
      resultados.classList.add("load");

      while (list.firstChild) {

          list.removeChild(list.firstChild);

      } 

      if(data.total_results>0){

          for (var i=0;i<data.results.length;i++){

              var li = document.createElement("li");

            var img = document.createElement("img");

            
              if(data.results[i].backdrop_path!=null){ 
                  
                  var path = (`https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`);
                  img.src = path;
                  
              }
              else{

                  img.src = "https://th.bing.com/th/id/OIP.hMlLJSmMJky9Rd1JwB86VgHaFl?w=244&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7";
                  
              }  

              var div = document.createElement("div");
              div.setAttribute("class","boxP");

              var pTitle = document.createElement("p");
              pTitle.textContent= data.results[i].title;
              pTitle.setAttribute("class","pTítulo");
              div.appendChild(pTitle);

              var pDesc = document.createElement("p");
              pDesc.setAttribute("class","pDescr");
              var text = data.results[i].overview;

              if(text!=null){
                  if(text.length>500){

                  var textSlice = text.slice(0,500);
                  pDesc.textContent = textSlice + "...";
                  var pInfo = document.createElement("p");
                  pInfo.textContent="Ler descrição completa"
                  pInfo.setAttribute("class","info menos");
                  pInfo.setAttribute("id",i);

                  pInfo.addEventListener("click",e=>{

                  const div = e.target.parentElement;
                  const pDesc = div.querySelector(".pDescr");   
                  
                    if(e.target.classList.contains("menos")){

                          e.target.textContent ="Menos informações";
                          pDesc.textContent = data.results[e.target.id].overview;

                      }else{

                          e.target.textContent="Ler descrição completa";
                          var text= data.results[e.target.id].overview;
                          text = text.slice(0,500);
                          pDesc.textContent = text + "...";

                      }

                      e.target.classList.toggle("menos");
                      e.target.classList.toggle("mais");
  
                  });

                  div.appendChild(pDesc);
                  div.appendChild(pInfo);
                  
                  }else{

                      pDesc.textContent=text;
                      div.appendChild(pDesc);

                  }
              }

              var a = document.createElement("a");
              a.textContent = "Onde assistir"
              a.href = `https://www.themoviedb.org/movie/${data.results[i].id}-${data.results[i].original_title}/watch?locale=BR`
              a.target='_blank' 
              a.rel="noopener noreferrer"

              div.appendChild(a)

              li.appendChild(img); 
              li.appendChild(div);
              list.appendChild(li);


          }  

      }else{

          var li = document.createElement("li");
          li.textContent="Não achamos nada";
          list.appendChild(li);
          list.style.listStyle="none";

      }

  }

  /* document.getElementById('titulo').addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
          loadData();
      }
  }); */

  async function filmesPopulares(){


    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2I4OTRiZmY0NGZiMjcyOWNkMDFiYWNmZmI1NmMwZSIsInN1YiI6IjY1OWFiMzdlY2E0ZjY3MDFhNDNkMGNlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6eP1cqvsGGfBzFBoiGRLWLi59zMG2sOFhuISm4L6m0o'
      }
    };
    
    var data = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc', options)
      .then(response => response.json())
      .catch(err => console.error(err));

    var divMãe = document.querySelector(".filmesPopulares");

    console.log(data)

    while (divMãe.firstChild) {

      divMãe.removeChild(divMãe.firstChild);

    }  

    var caixaSuperior = document.createElement("div");
    caixaSuperior.setAttribute("class","Box top5");

    var caixaTitulo = document.createElement("div");
    caixaTitulo.setAttribute("class","caixaTit");

    var h = document.createElement("h3");
    h.textContent = "Top 5 filmes do momento🔥"

    caixaTitulo.appendChild(h)

    for(var i = 0; i<5 ; i++){

      var caixaFilme = document.createElement("div");
      caixaFilme.setAttribute("class","caixaInd");

      var img = document.createElement("img");
            
      img.src = (`https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`);

      caixaFilme.appendChild(img);

      var pTitle = document.createElement("p");
            pTitle.textContent= data.results[i].title;
            pTitle.setAttribute("class","pTítulo");
            caixaFilme.appendChild(pTitle);
      
      caixaFilme.appendChild(pTitle);  
      
      var a = document.createElement("a");
      a.textContent = "Onde assistir"
      a.href = `https://www.themoviedb.org/movie/${data.results[i].id}-${data.results[i].original_title}/watch?locale=BR`
      a.target='_blank' 
      a.rel="noopener noreferrer"

      caixaFilme.appendChild(a);

      caixaSuperior.appendChild(caixaFilme)


    }

    divMãe.appendChild(caixaTitulo)
    divMãe.appendChild(caixaSuperior);
      
    var col = 0;

    var caixaTit = document.createElement("div");
    caixaTitulo.setAttribute("class","caixaTit");

    var h = document.createElement("h3");
    h.textContent = "Filmes populares que você não pode perder🍿"

    caixaTit.appendChild(h)

    divMãe.appendChild(caixaTit)

    var caixaPop = document.createElement("div");
    caixaPop.setAttribute("class","Box pop");

    for(var i = 5; i<data.results.length ; i++){


      var caixaFilmePop = document.createElement("div");
      caixaFilmePop.setAttribute("class","caixaInd");

      var img = document.createElement("img");
            
      img.src = (`https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`);

      caixaFilmePop.appendChild(img);

      var pTitle = document.createElement("p");
            pTitle.textContent= data.results[i].title;
            pTitle.setAttribute("class","pTítulo");
            caixaFilme.appendChild(pTitle);
      
      caixaFilmePop.appendChild(pTitle);  
      
      var a = document.createElement("a");
      a.textContent = "Onde assistir"
      a.href = `https://www.themoviedb.org/movie/${data.results[i].id}-${data.results[i].original_title}/watch?locale=BR`
      a.target='_blank' 
      a.rel="noopener noreferrer"

      caixaFilmePop.appendChild(a);

      caixaPop.appendChild(caixaFilmePop);
      divMãe.appendChild(caixaPop); 

      col++;

      if(col==5){

        var caixaPop = document.createElement("div");
        caixaPop.setAttribute("class","Box pop");
        col = 0

      }

  }

  divMãe.appendChild(caixaPop); 
  
  
  

}
  

  return (
    <>
      <div className='logoSite' onLoadStart={filmesPopulares()}>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <h2>Catálogo de filmes Fullstack</h2>

      </div>

      <div className="pesquisa">
        <h3>Pesquise um filme</h3>
        <input type="text" name="titulo" id="titulo" placeholder="Digite o nome do filme"></input>
        <button type="button" onClick={loadData} className="btn"><p>Pesquisar</p></button>

      </div>

      <div className='filmesPopulares load' >


      </div>

      <div className="resultado">

        <button type="button" id='volta' onClick={function toggle(){ 
          var resultados = document.querySelector(".resultado");
          var divMãe = document.querySelector(".filmesPopulares");
          divMãe.classList.toggle("load");
          resultados.classList.toggle("load");

         }}>Voltar a tela de sugestões</button>

        <ol id="lista">

        </ol>

      </div>
     
      </>
  )
}

export default App
