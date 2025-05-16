import React from 'react';
import { useGetPokemonByIdQuery } from '../api/pokemonApi';

const ApiTest: React.FC = () => {
  const { data, error, isLoading } = useGetPokemonByIdQuery(7);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors de l’appel API</p>;

  return (
    <div>
      <h2>{data?.name}</h2>
      <img src={data?.sprites?.front_default} alt={data?.name} />
      <p>Type : {data?.types?.map((t: any) => t.type.name).join(', ')}</p>
    </div>
  );
};

export default ApiTest;
