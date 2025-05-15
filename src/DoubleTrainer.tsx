import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

type Pokemon = {
  name: string
  level: number
  id: number
  sprite: string
  types: string[]
  stats: {
    hp: number
    atk: number
    def: number
    speAtk: number
    speDef: number
    vit: number
  }
}

type Trainer = {
  id: number
  name: string
  team: Pokemon[]
}

const TrainerCard: React.FC<{
  trainer: Trainer
  onAddPokemon: (id: number, pokemon: Pokemon) => void
}> = ({ trainer, onAddPokemon }) => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [pokemonFound, setPokemonFound] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  
  const searchPokemon = async (name: string) => {
    if (!name.trim()) return
    setLoading(true)
    setError('')
    
    const lowerCaseName = name.trim().toLowerCase(); 
    
    try {
      const response = await axios.get(`https://tyradex.app/api/v1/pokemon/${lowerCaseName}`)
      console.log(response.data)  

      if (response.data) {
        setPokemonFound({
          name: response.data.name.fr,
          level: Math.floor(Math.random() * 100) + 1, 
          id: response.data.pokedex_id,
          sprite: response.data.sprites.regular,
          types: response.data.types.map((type: any) => type.name),
          stats: response.data.stats,
        })
      } else {
        setError('Aucun Pokémon trouvé. Vérifie le nom et réessaie.')
      }
    } catch (err: any) {
      setError(`Erreur lors de la recherche du Pokémon : ${err.message}`)
      console.error("Erreur lors de la recherche du Pokémon:", err)
    }
    setLoading(false)
  }

  const handleAdd = () => {
    if (pokemonFound) {
      onAddPokemon(trainer.id, pokemonFound)
      setPokemonFound(null)
      setShowSearch(false)
      setSearchTerm('')
    }
  }

  return (
    <div className="card">
      <h2>{trainer.name}</h2>
      <ul>
        {trainer.team.map((p, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Image du Pokémon */}
            <img 
              src={p.sprite} 
              alt={p.name} 
              style={{ width: '40px', height: '40px', marginRight: '10px' }} 
            />
            {/* Nom et niveau du Pokémon */}
            {p.name} – Niveau {p.level}
          </li>
        ))}
      </ul>
      {showSearch ? (
        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Rechercher un Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => searchPokemon(searchTerm)} disabled={loading}>
            {loading ? 'Recherche en cours...' : 'Rechercher'}
          </button>
          {pokemonFound && (
            <div>
              <h3>Résultat :</h3>
              <p>{pokemonFound.name} - Niveau {pokemonFound.level}</p>
              <img src={pokemonFound.sprite} alt={pokemonFound.name} />
              <div>
                <h4>Types :</h4>
                {pokemonFound.types.map((type, index) => (
                  <span key={index} style={{ marginRight: '8px' }}>
                    {type}
                  </span>
                ))}
              </div>
              <div>
                <h4>Stats :</h4>
                <p>HP: {pokemonFound.stats.hp}</p>
                <p>Attaque: {pokemonFound.stats.atk}</p>
                <p>Défense: {pokemonFound.stats.def}</p>
                <p>Attaque Spéciale: {pokemonFound.stats.speAtk}</p>
                <p>Défense Spéciale: {pokemonFound.stats.speDef}</p>
                <p>Vitesse: {pokemonFound.stats.vit}</p>
              </div>
              <button onClick={handleAdd}>Ajouter à l'équipe</button>
            </div>
          )}
          {!pokemonFound && searchTerm && !loading && !error && (
            <p>Aucun Pokémon trouvé.</p>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <button onClick={() => setShowSearch(true)}>Ajouter un Pokémon</button>
      )}
    </div>
  )
}

const DoubleTrainer: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [trainerName, setTrainerName] = useState('')

  const createTrainer = () => {
    if (trainerName.trim() && trainers.length < 2) {
      const newTrainer: Trainer = {
        id: Date.now(),
        name: trainerName,
        team: [],
      }
      setTrainers([...trainers, newTrainer])
      setTrainerName('')
    }
  }

  const addPokemon = (trainerId: number, pokemon: Pokemon) => {
    setTrainers((prev) =>
      prev.map((t) =>
        t.id === trainerId ? { ...t, team: [...t.team, pokemon] } : t
      )
    )
  }

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

      {trainers.map((t) => (
        <TrainerCard key={t.id} trainer={t} onAddPokemon={addPokemon} />
      ))}
    </div>
  )
}

export default DoubleTrainer
