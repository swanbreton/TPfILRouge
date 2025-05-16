import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ApiTest: React.FC = () => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://tyradex.app/api/v1/pokemon/carapuce')
        console.log('Réponse brute :', response.data)
        setData(response.data)
      } catch (err) {
        console.error('Erreur lors de l’appel API :', err)
        setError('Erreur lors de l’appel API')
      }
    }

    fetchPokemon()
  }, [])

  if (error) return <p>{error}</p>
  if (!data) return <p>Chargement...</p>

  return (
    <div>
      <h2>{data.name.fr}</h2>
      <img src={data.sprites.regular} alt={data.name.fr} />
      <p>Type : {data.types.map((t: any) => t.name).join(', ')}</p>
    </div>
  )
}

export default ApiTest
