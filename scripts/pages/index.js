let photographers = []; //tableau pour y stocker les données du json
async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        let fetchUrl = "./data/photographers.json";
        await fetch(fetchUrl) //asynchrone
        .then((res) => res.json()) //promise
        .then((data) => {
            photographers = data.photographers;
            medias = data.media;
            //console.log(data)
        })
      
    }
    async function displayData() {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
      
    }

    async function init() {
        await getPhotographers()
        displayData();
    }
  
    init();

