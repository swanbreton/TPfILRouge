  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (builder) => ({
      getPokemonById: builder.query<any, number>({
        query: (id) => `pokemon/${id}`,
      }),
      getPokemonByGeneration: builder.query<any, number>({
        query: (gen) => `generation/${gen}`,
      }),
    }),
  });

  export const { 
    useGetPokemonByIdQuery,  
    useGetPokemonByGenerationQuery
  } = pokemonApi;
