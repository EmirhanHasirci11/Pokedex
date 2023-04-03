const searchInput = document.querySelector(".search")
const containerRow =document.querySelector("#pokeContainerRow")
document.querySelector("footer .col").innerHTML=`Made by Emirhan Hasırcı. 03/04/2023`

searchInput.addEventListener("input", function (e) {
    const pokeName = document.querySelectorAll(".poke-name");
    pokeName.forEach((poke) => {
      poke.parentElement.parentElement.parentElement.style.display="block"
      
      if (!poke.innerHTML.toLowerCase().includes(searchInput.value.toLowerCase())) {
          poke.parentElement.parentElement.parentElement.style.display="none"
      
      
      }
    });
  });

const pokemonInitializer = async () => {
    for (let i = 1; i <= 151; i++) {
        await getPokemon(i);
    }
}
const colors = {
    normal: "#a8a878",
    fire: "#fd7d24",
    grass: "#78c850",
    electric: "#f8d030",
    water: "#6890f0",
    ghost: "#705898",
    dark:"#705848",
    steel:"#b8b8d0",    
    ground: " #e0c068",
    rock: "#b8a038",
    fairy: "#ffb7fa",
    poison: "#a040a0",
    bug: "#f8d5a3",
    dragon: "#7038f8",
    psychic: "#f85888",
    flying: "#a890f0",
    fighting: "#c03028",
    ice: "#98d8d8 ",
  };

const getPokemon = async (pokeid) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeid}`
    const result = await fetch(url);
    const data = await result.json();
    pokeCardCreator(data)
}
const pokeCardCreator = (pokemon) => {    
    
    let pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    let pokemonPic = pokemon.sprites.other['official-artwork'].front_default
    let pokemonId = pokemon.id.toString().padStart(4,"0");    
    let pokemonWeight =pokemon.weight;
    let pokemonHeight =pokemon.height.toString();
    let pokemonSpecies ="";
    for(let i =0;i<pokemon.types.length;i++){
        let pokeType =pokemon.types[i]["type"].name
        pokemonSpecies+=
        `
        <span class="badge me-1 mb-2" style="background-color:${colors[pokeType]}">${pokeType}</span>
        `
    }
    let innerCard = `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3 poke-col">
        <div class="card border border-5 border-dark" style="max-width: 400px;" ">
            <img src="${pokemonPic}"class="card-img-top border-bottom border-dark img-fluid" alt="">
                <div class="card-body">
                <h5 class="card-title border-bottom border-2 poke-name">${pokemonName}</h5>
                <p class="card-text mb-0">#${pokemonId}</p>
                <div class='text-uppercase' style="font-family: 'Trebuchet MS';">
                ${pokemonSpecies}                    
                </div>
                <div>
                <span>Weight:${pokemonWeight}</span>
                </div>                
                <div>
                <span>Height::${pokemonHeight}</span>
                </div>
                
               
             </div>
        </div>
    </div>
    `
    containerRow.innerHTML+=innerCard

}
pokemonInitializer()