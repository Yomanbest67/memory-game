import { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid';
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [pokemonDiv, setPokemonDiv] = useState([]);
  const [pokemonList, setPokemonList] = useState(['pikachu', 'ditto', 'bulbasaur', 
    'charmander', 'squirtle', 'meowth', 'geodude', 'raichu',
    'pidgey', 'rattata', 'zubat', 'jigglypuff'
  ]);
  const [random, setRandom] = useState(false);

  // function randomizePokemon(pokemonlist) {
  //     let randomized = pokemonlist.sort(() => Math.random() - 0.5);

  //     setPokemonList(randomized);
  //     random? setRandom(false) : setRandom(true);
  // }

  useEffect(() => {
      pokemonList.forEach((pokemon) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then((result) => result.json())
          .then((data) => {
            setPokemonDiv((prevPokemonDiv) => {
              return [
                ...prevPokemonDiv,
                {
                  name: pokemon,
                  image: data.sprites.front_default,
                  id: uuidv4(),
                },
              ];
            });
          });
      });
      
  }, [pokemonList, random]);

  function handleClick(event, pokemon) {
    if (clicked.includes(pokemon)) {
      setBestScore(score > bestScore ? score : bestScore);
      setScore(0);

      clicked.splice(0, clicked.length);
    } else {
      
      setClicked([...clicked, pokemon]);
      setScore(score + 1);
    }

    // randomizePokemon(pokemonList);

    shuffleCards(pokemonDiv);
  }

  function shuffleCards(list) {
    list = list.sort(() => Math.random() - 0.5);

    return (
      list.map((pokemon) => (
        <div key={pokemon.id} className='pokemon' onClick={(event) => handleClick(event, pokemon.name)}>
          <img src={pokemon.image} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
        </div>
      ))
    )
  }

  return (
    <>
      <div className="App">
        <h1>Pokemon Memory Game</h1>
        <h2>Score: {score}</h2>
        <h2>Best Score: {bestScore}</h2>
        <div className='pokemon-container'>
          {shuffleCards(pokemonDiv)}
        </div>
      </div>
    </>
  )
}

export default App
