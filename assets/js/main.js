const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const PokemonModal = document.getElementById('PokemonModal');




const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

const toggleModal =() =>{
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
}




pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        const pokemonNumber = clickedPokemon.querySelector('.number').textContent.slice(1);
        const pokemonName = clickedPokemon.querySelector('.name').textContent;
        const pokemonType = clickedPokemon.querySelector('.type').textContent;
        const pokemonImage = clickedPokemon.querySelector('img').getAttribute('src');

        const pokemon = {
            number: pokemonNumber,
            name: pokemonName,
            type: pokemonType,
            photo: pokemonImage,
        };

        openModal(pokemon);
    }   
});


function openModal(pokemon){
    const typesHtml = pokemon.types ? `
    <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ol>
    ` : '';

    const PokemonmodalContent = `
      <div class="modalcabecalho ${pokemon.type}">
        <button class="close-button" onclick="fecharModal()"></button>
        <h1 Class="modalnome">${pokemon.name}</h1>
        
        <span class="modalNum">#${pokemon.number}</span>
        <div>
            <span class="pokemon ${pokemon.type}">typesHtml</span>
        </div>

        <img class="imagemmodal" src="${pokemon.photo}" alt="${pokemon.name}">
       
      </div>
      <div class="modalcorpo">
        <div class="corpoCabecalho">
            <span>abount</span>
        </div>

        <div class="bodycorpo">
          

        </div>
      </div>
      
      <div>rodape</div>

    `;

    PokemonModal.innerHTML = PokemonmodalContent;

    PokemonModal.style.display = 'block';


}

function fecharModal() {
    PokemonModal.style.display = 'none';
}

PokemonModal.addEventListener('click', (event) => {
    if (event.target === PokemonModal) {
        fecharModal();
    }
});
