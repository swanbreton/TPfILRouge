import React, { useState, useEffect } from 'react';
import '../pages/App.css';

import useAppDispatch from '../hooks/useAppDispatch';
import { addCapturedPokemon, removeCapturedPokemon } from '../store/slices/pokemon-slices';
import { useGetPokemonByIdQuery } from '../api/pokemonApi';

type Pokemon = {
  name: string;
  level: number;
  id: number;
  sprite: string;
};

type Trainer = {
  id: number;
  name: string;
  team: Pokemon[];
};

const generationOptions = [
  { label: "Gen 1", value: 1 },
  { label: "Gen 2", value: 2 },
  { label: "Gen 3", value: 3 },
  { label: "Gen 4", value: 4 },
  { label: "Gen 5", value: 5 },
  { label: "Gen 6", value: 6 },
  { label: "Gen 7", value: 7 },
  { label: "Gen 8", value: 8 },
];

const DoubleTrainer: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [trainerName, setTrainerName] = useState('');
  const [selectedGens, setSelectedGens] = useState<number[]>([1]);
  const [randomPokemonId, setRandomPokemonId] = useState<number | null>(null);
  const [allPokemonSpecies, setAllPokemonSpecies] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  // Création d'un dresseur
  const createTrainer = () => {
    if (trainerName.trim() && trainers.length < 2) {
      const newTrainer: Trainer = {
        id: Date.now(),
        name: trainerName,
        team: [],
      };
      setTrainers([...trainers, newTrainer]);
      setTrainerName('');
    }
  };

  // Gestion de la sélection des générations
  const toggleGenSelection = (value: number) => {
    setSelectedGens((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Récupération des Pokémon pour chaque génération sélectionnée
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const promises = selectedGens.map((gen) =>
          fetch(`https://pokeapi.co/api/v2/generation/${gen}`).then((res) => res.json())
        );
        const results = await Promise.all(promises);
        const species = results.flatMap((res) => res.pokemon_species);
        setAllPokemonSpecies(species);
      } catch (error) {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      }
    };
    fetchAllPokemon();
  }, [selectedGens]);

  // Récupération du Pokémon aléatoire par ID
  const { data: randomPokemon, isLoading, isError } = useGetPokemonByIdQuery(randomPokemonId || 1);

  // Sélection d'un Pokémon aléatoire parmi les générations choisies
  const handleSearchRandom = () => {
    if (allPokemonSpecies.length > 0) {
      const randomIndex = Math.floor(Math.random() * allPokemonSpecies.length);
      const pokemonUrl = allPokemonSpecies[randomIndex].url;
      const pokemonId = parseInt(pokemonUrl.split('/').slice(-2, -1)[0]);
      setRandomPokemonId(pokemonId);
    }
  };

  // Capturer le Pokémon aléatoire
  const handleCapture = (trainerId: number) => {
    if (randomPokemon) {
      const newPokemon: Pokemon = {
        name: randomPokemon.name,
        level: 1,
        id: randomPokemon.id,
        sprite: randomPokemon.sprites.front_default,
      };
      setTrainers((prev) =>
        prev.map((t) =>
          t.id === trainerId ? { ...t, team: [...t.team, newPokemon] } : t
        )
      );
      dispatch(addCapturedPokemon(newPokemon.id));
    }
  };

  // Libérer un Pokémon
  const removePokemon = (trainerId: number, pokemonId: number) => {
    setTrainers((prev) =>
      prev.map((t) =>
        t.id === trainerId ? { ...t, team: t.team.filter((p) => p.id !== pokemonId) } : t
      )
    );
    dispatch(removeCapturedPokemon(pokemonId));
  };

  return (
    <div className="container">
      {trainers.length < 2 && (
        <div className="card">
          <h2>Créer un Dresseur</h2>
          <input
            type="text"
            placeholder="Nom du dresseur"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
          />
          <button onClick={createTrainer}>Valider</button>
        </div>
      )}
      {trainers.map((trainer) => (
        <div key={trainer.id} className="card">
          <h2>{trainer.name}</h2>

          <div className="gen-selection">
            {generationOptions.map((gen) => (
              <button
                key={gen.value}
                className={`gen-button ${selectedGens.includes(gen.value) ? 'selected' : ''}`}
                onClick={() => toggleGenSelection(gen.value)}
              >
                {gen.label}
              </button>
            ))}
          </div>

          <button onClick={handleSearchRandom} style={{ marginTop: '1rem' }}>Chercher Pokémon Aléatoire</button>

          {isLoading && <p>Chargement du Pokémon...</p>}
          {isError && <p>Erreur lors de la récupération du Pokémon</p>}
          {randomPokemon && (
            <div>
              <h3>{randomPokemon.name} - Niveau 1</h3>
              <img src={randomPokemon.sprites.front_default} alt={randomPokemon.name} />
              <button onClick={() => handleCapture(trainer.id)}>Capturer</button>
            </div>
          )}

          <h3>Équipe :</h3>
          <ul>
            {trainer.team.map((p) => (
              <li key={p.id}>
                {p.name} - Niveau {p.level}
                <img src={p.sprite} alt={p.name} style={{ width: '40px', marginLeft: '8px' }} />
                <button onClick={() => removePokemon(trainer.id, p.id)}>Libérer</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DoubleTrainer;
