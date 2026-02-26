/*import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PokeAPI } from "./api";
*/

import { useEffect } from "react";
import { useState } from "react";
import { PokeAPI } from "./api";

type Props = {
   id: number;
  image: string;
  name: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAtk: number;
    spDef: number;
    speed: number;
  }; 
};


interface PokemonCard extends Props {}

async function fetchPokemons(offset: number): Promise<PokemonCard[]> {
  const list = await PokeAPI.listPokemons(offset, 20);
  const pokemons = await Promise.all(
    list.results.map(async (item: { name: string; url: string }) => {
      const pokemon = await PokeAPI.getPokemonByName(item.name);
      return {
        id: pokemon.id,
        image: pokemon.sprites.other?.["official-artwork"].front_default ?? "",
        name: pokemon.name,
        types: pokemon.types.map((type: any) => type.type.name),
        stats: {
          hp: pokemon.stats[0].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          spAtk: pokemon.stats[3].base_stat,
          spDef: pokemon.stats[4].base_stat,
          speed: pokemon.stats[5].base_stat,
        },
      };
    }),
  );
  return pokemons;
}

function Card(props: Props) {
  const stats = props.stats || {
    hp: 35,
    attack: 55,
    defense: 40,
    spAtk: 50,
    spDef: 50,
    speed: 90,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-72">
      <img 
        src={props.image} 
        alt={props.name} 
        className="w-full h-48 object-cover rounded-t-lg" 
      />
      <h2 className="text-xl font-bold mb-2">{props.name}</h2>
      <p className="text-sm text-gray-600 mb-3">ID: #{props.id}</p>
      <div className="flex space-x-2">
        {props.types.map((type) => (
          <span
            key={type}
            className={`text-white text-xs font-semibold px-2 py-1 rounded ${getTypeColor(type)}`}
          >
            {type}
          </span>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <StatBar label="HP" value={stats.hp} />
        <StatBar label="Atk" value={stats.attack} />
        <StatBar label="Def" value={stats.defense} />
        <StatBar label="SpA" value={stats.spAtk} />
        <StatBar label="SpD" value={stats.spDef} />
        <StatBar label="Spe" value={stats.speed} />
      </div>
    </div>
  )
}

function StatBar({ label, value }: { label: string; value: number }) {
  const percentage = Math.min((value / 150) * 100, 100);
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-8 font-semibold text-gray-700">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-gray-600">{value}</span>
    </div>
  );
}


    <Card
export function Root() {
  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundImage: "url('/geodude-pattern.png')", backgroundRepeat: "repeat" }}>
      <Card
        id={25}
        image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        name="Pikachu"
        types={["electric"]}
        stats={{
          hp: 35,
          attack: 55,
          defense: 40,
          spAtk: 50,
          spDef: 50,
          speed: 90,
        }}
      />
    </div>
  )
}

function getTypeColor(type: string): string {
  return typeColors[type] || typeColors.normal;
}

const typeColors: { [key: string]: string } = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-400",
  dragon: "bg-purple-700",
  dark: "bg-gray-700",
  fairy: "bg-pink-300",
  normal: "bg-gray-400",
  fighting: "bg-red-700",
  flying: "bg-indigo-400",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  rock: "bg-yellow-800",
  bug: "bg-green-700",
  ghost: "bg-indigo-700",
  steel: "bg-gray-500",
};

/*
interface PokemonCard {
  id: number;
  image: string;
  name: string;
  types: string[];
}

async function fetchData(offset: number): Promise<PokemonCard[]> {
  const list = await PokeAPI.listPokemons(offset, 20);
  const pokemons = await Promise.all(
    list.results.map(async (item: { name: string; url: string }) => {
      const pokemon = await PokeAPI.getPokemonByName(item.name);
      return pokemon;
    }),
  );

  return pokemons.map((item) => ({
    id: item.id,
    image: item.sprites.other?.["official-artwork"].front_default ?? "",
    name: item.name,
    types: item.types.map((type) => type.type.name),
  }));
}*/