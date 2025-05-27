// TypeScript code for Pokémon Search

const input = document.getElementById('pokemon-input') as HTMLInputElement;
const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const pokemonData = document.getElementById('pokemon-data') as HTMLDivElement;
const pokemonName = document.getElementById('pokemon-name') as HTMLElement;
const pokemonImage = document.getElementById('pokemon-image') as HTMLImageElement;
const pokemonType = document.getElementById('pokemon-type') as HTMLElement;
const errorMessage = document.getElementById('error-message') as HTMLElement;

async function fetchPokemonData(pokemon: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) {
      throw new Error('Pokémon not found.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function searchPokemon() {
  const pokemon = input.value.trim().toLowerCase();
  if (!pokemon) return;

  try {
    const data = await fetchPokemonData(pokemon);
    pokemonName.textContent = data.name;
    pokemonImage.src = data.sprites.front_default;
    pokemonType.textContent = data.types.map((type: any) => type.type.name).join(', ');
    errorMessage.style.display = 'none';
    pokemonData.style.display = 'block';
  } catch (error: any) {
    pokemonData.style.display = 'none';
    errorMessage.textContent = error.message;
    errorMessage.style.display = 'block';
  }
}

searchButton.addEventListener('click', searchPokemon);
input.addEventListener('keyup', event => {
  if ((event as KeyboardEvent).key === 'Enter') {
    searchPokemon();
  }
});
