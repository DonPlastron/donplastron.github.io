/* ================= DATA ================= */
/*
Dit deel voegt nieuwe hobby's/films toe.
title = naam van hobby/film (komt in titel, sidebar en op detailpagina; html bestand moet dan titel.html zijn in juiste folder)
image = pad naar afbeelding van icoontje
*/

let data = {
  hobbies: [
    {title:"Skiën", image:"img/ski.jpg"},
    {title:"Fotografie", image:"https://picsum.photos/400?1"},
      {title:"Naaien", image:"img/naaien.jpg"},
      {title:"Poker", image:"img/poker/poker.jpg"},
      {title:"Vogelspotten", image:"img/vogelspot.jpeg"}
    ],
    films: [
        {title:"A Beautiful Mind", image:"img/a beautiful mind.jpg"},
        {title:"Ace Ventura, Pet Detective", image:"img/ace ventura.jpg"}, // komma ipv dubbelpunt
        {title:"An Affair to Remember", image:"https://picsum.photos/400?7"},
        {title:"Animal House", image:"img/Animal House.jpg"},
        {title:"Franse films", image:"img/franse_siemen.jfif"}
    ]
};

/* ================= RENDER ================= */

const url = new URL(window.location.href)
const match = url.href.match(/^(.*?Blog\/)/);
const baseUrl = match ? match[1] : url.origin + "/";

render();

function render(){
  let pathAddendum = "";
  // if url contains http: github pages => href = only part after base url
  const nestingAmount = url.href.split("/").length - baseUrl.split("/").length;
  
  if (nestingAmount === 0) {
    
    if (url.searchParams.get("page")) {
      showPage(url.searchParams.get("page"));
    }
    else { 
        showPage("home");
    }
  
  
    // Hobby grid
    let hobbyGrid=document.getElementById("hobbyGrid");
    hobbyGrid.innerHTML="";
    data.hobbies.forEach((h,i)=>{
      let div=document.createElement("a");
      div.className="grid-item fade";
      div.innerHTML=`<img src="${h.image}"><div class="overlay">${h.title}</div>`;
      div.href=`hobby/${h.title}.html`;
      hobbyGrid.appendChild(div);
    });
    // Film grid
    let filmGrid=document.getElementById("filmGrid");
    filmGrid.innerHTML="";
    data.films.forEach((f,i)=>{
      let div=document.createElement("a");
      div.className="grid-item fade";
      div.innerHTML=`<img src="${f.image}"><div class="overlay">${f.title}</div>`;
      div.href=`film/${f.title}.html`;
      filmGrid.appendChild(div);
    });
    updateProgress(data);
  } else{
    pathAddendum = "../";
  }
  // Sidebar
  let sh=document.getElementById("sidebarHobby");
  sh.innerHTML="";
  data.hobbies.forEach((h,i)=>{
  sh.innerHTML+=`<a href="${pathAddendum + "hobby/" + h.title}.html">${h.title}</a>`;
  });

  let sf=document.getElementById("sidebarFilms");
  sf.innerHTML="";
  data.films.forEach((f,i)=>{
  sf.innerHTML+=`<a href="${pathAddendum + "film/" + f.title}.html">${f.title}</a>`;
  });

}

/* ================= NAVIGATIE ================= */

function hideAll(){
homePage.classList.add("hidden");
hobbyPage.classList.add("hidden");
filmPage.classList.add("hidden");
}

function showPage(page) { //"home", "hobby" or "film"
  const pageItem = document.getElementById(page + "Page");

  if (pageItem) { // page exists (we are on the same page)
    hideAll?.();
    pageItem.classList.remove("hidden");
    window.history.replaceState(null, null, "?page=" + page);
  } else { // We are on different page
    // Navigate to the correct page
    window.location.href = baseUrl + "index.html?page=" + page;
  }
}

function toggleSidebar(){
sidebar.classList.toggle("open");
}

function updateProgress(data) {
  const max = 462; // define what "100%" means
  const count = data.films.length -1; // -1 want franse films

  let percentage = Math.min((count / max) * 100, 100);
  percentage = Math.round(percentage);

  document.getElementById("progressBar").style.width = percentage + "%";
  document.getElementById("progressPercentage").textContent = percentage + "%";
}