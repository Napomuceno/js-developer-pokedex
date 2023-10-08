const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemonSpecies = new PokemonSpecies();
    pokemonSpecies.number = pokeDetail.id;
    pokemonSpecies.order = pokeDetail.order;
    pokemonSpecies.name = pokeDetail.name;
    pokemonSpecies.abilidades=pokeDetail.abilities.map((abilityname) => abilityname.ability.name);
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemonSpecies.types = types;
    pokemonSpecies.type = type;
    pokemonSpecies.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemonSpecies.base_esperiencias=pokeDetail.base_experience;
    pokemonSpecies.altura = pokeDetail.height;
    pokemonSpecies.largura = pokeDetail.weight;

  


    return pokeApi.getPokemonDetailspecies(pokeDetail.species)
        .then((speciesInfo) => {
            pokemonSpecies.base_happiness = speciesInfo.base_happiness;
            pokemonSpecies.capture_rate = speciesInfo.capture_rate;
            pokemonSpecies.color = speciesInfo.color.name;
            pokemonSpecies.egg_groups = speciesInfo.egg_groups.map((eggGroup) => eggGroup.name);
            pokemonSpecies.specie = speciesInfo.genera[7].genus;
            pokemonSpecies.generation = speciesInfo.generation.name;
            pokemonSpecies.growth_rate = speciesInfo.growth_rate.name;
            pokemonSpecies.habitat = speciesInfo.habitat.name;
            pokemonSpecies.has_gender_differences = speciesInfo.has_gender_differences;
            pokemonSpecies.hatch_counter = speciesInfo.hatch_counter;
            pokemonSpecies.genero = speciesInfo.gender_rate;
            
            return pokemonSpecies;
        });
}

pokeApi.getPokemonDetailspecies = (pokemonspec) => {
    return fetch(pokemonspec.url)
        .then((response) => response.json());
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
}



pokeApi.getPokemonunico = (idpokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${idpokemon}/`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
}