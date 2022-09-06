//Mettre le code JavaScript lié à la page photographer.html
let photographer = {}; //objet pour stocker le photographe
let medias = []; //tableau pour stocker les médias
let totalLikes = []; // sotcke les likes
let sumLikes = ""; //stocke la somme des likes

async function getPhotographerAndMedia() {
  //récupérer l'id passé dans la page
  let str = window.location.href;
  let url = new URL(str);
  let searchParams = new URLSearchParams(url.search);
  let id = parseInt(searchParams.get("id")); //parseInt pour transformer en nombre
  //console.log(id);
  let fetchUrl = "/data/photographers.json";
  await fetch(fetchUrl) //asynchrone
    .then((res) => res.json()) //promise
    .then((data) => {
      for (let i = 0; i < data.photographers.length; i++) {
        //console.log(data.photographers[i].id);
        if (id === data.photographers[i].id) {
          photographer = data.photographers[i];
          break;
        }
      }
      medias = data.media.filter((element) => {
        
        return id === element.photographerId;
      });
      
      totalLikes = medias.map((media) => {return media.likes})//boucle pour mettre les likes dans totalLikes
      sumLikes = totalLikes.reduce(function (a,b) { //function qui additionne les likes
        return (a + b);
        }, 0)
        
     });
     
}

const displayPhotographerAndMedia = async () => {
  await getPhotographerAndMedia();
  
  photographerFactory(photographer).getPhotographerCard() //appelle la function pour afficher le photographe
  displayMedias()
  
    document.querySelector(".total-likes").innerHTML = `<div class="flex">${sumLikes} <i class="fa-solid fa-heart"></i> ${photographer.price}€ / jour</div>`; //affiche le nombre de likes
    likeUpdate();
    
};
function likeUpdate() {
    let selectLikes = document.querySelectorAll(".off");
    //console.log(selectLikes);
    selectLikes.forEach(element => {
        //console.log(element);
        element.onclick = function (event) {
            
            //console.log(event.target.dataset)
            let id = parseInt(event.target.dataset.id);
            
            if(event.target.classList.contains("off")){//on compare s'il y a la classe off, si oui on incrémente et on enleve off, et on rajoute on
                medias.forEach((media) => {
                    if(media.id === id) { //on compare l'id d'element et celui de media.id
                        media.likes ++;
                        document.querySelector(`#id-${id} span`).innerText = media.likes;//on update le like
                        sumLikes++;//on rajoute 1 à la somme des likes
                        document.querySelector(".total-likes").innerHTML = `<div class="flex">${sumLikes} <i class="fa-solid fa-heart"></i> ${photographer.price}€ / jour</div>`;//on re affiche le total des likes mis à jour
                        event.target.classList.remove("off");
                        event.target.classList.add("on");
                    }
                })
            }
            else if(event.target.classList.contains("on")) { // on compare s'il y a la class on, si oui, on diminue de 1 et on enleve on et on remplace par off
                medias.forEach((media) => {
                    if(media.id === id) { //on compare l'id d'element et celui de media.id
                        media.likes --;
                        document.querySelector(`#id-${id} span`).innerText = media.likes;//on update le like
                        sumLikes--;//on soustrait 1 à la somme des likes
                        document.querySelector(".total-likes").innerHTML = `<div class="flex">${sumLikes} <i class="fa-solid fa-heart"></i> ${photographer.price}€ / jour</div>`;//on re affiche le total des likes mis à jour
                        event.target.classList.add("off");
                        event.target.classList.remove("on");
                    }
                })
            }
            
            
        }
    })  
}
//tri des médias
document.querySelector("select").addEventListener("change", e=> {
  console.log("changement", e.target.value)
  
  if(e.target.value == "popularity"){
    console.table(medias)
    medias.sort((mediaA, mediaB)=> {
      return mediaA.likes - mediaB.likes
    }).reverse() //du plus grand au plus petit
    console.table(medias)
    displayMedias();
  }
})
document.querySelector("select").addEventListener("change", e=> {
  console.log("changement", e.target.value)
  
  if(e.target.value == "date"){
    console.table(medias)
    medias.sort((mediaA, mediaB)=> {
      return new Date().valueOf(mediaA.likes) - new Date().valueOf(mediaB.likes)
    }).reverse() //du plus récent au plus ancien
    console.table(medias)
    displayMedias();
  }
})
new Date().valueOf()

//fonction pour afficher les médias
function displayMedias() {
  document.querySelector(".photos").innerHTML = medias
  .map(
    (media) => mediaFactory(media).getMediaCard() //appelle la fonction pour afficher les médias
  )
  .join("");
}

displayPhotographerAndMedia();

getPhotographerAndMedia();

