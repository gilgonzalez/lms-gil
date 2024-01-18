"use client";

import { Category } from "@prisma/client";
import React from "react";
import { MdVideogameAsset } from "react-icons/md";
import { TbMathSymbols } from "react-icons/tb";
import { IoFitnessSharp, IoLanguageSharp ,IoNutrition} from "react-icons/io5";

import {
  FcMoneyTransfer,
  FcMindMap,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcFilmReel,
  FcSportsMode,
  FcLikePlaceholder
} from "react-icons/fc";
import { IconType } from "react-icons"
import CategoryItem from "./category-item";

interface Props {
  items: Category[];
}

const iconMap : Record<Category["name"], IconType> = {
  "Music" : FcMusic,
  "Bets" : FcMoneyTransfer,
  "Fitness": IoFitnessSharp,
  "Computer Science" : FcMultipleDevices,
  "E-Sports": MdVideogameAsset,
  "Health": FcLikePlaceholder,
  "Maths" : TbMathSymbols,
  "General Sports": FcSportsMode,
  "Languages" : IoLanguageSharp,
  "Mindfullness": FcMindMap,
  "Nutrition" : IoNutrition,
  "Photography" : FcOldTimeCamera,
  "Films": FcFilmReel,
}

const Categories = ({ items }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 overflow-x-auto pb-2">
      {items.map(({id, name}) => (
        <CategoryItem
          key={id}
          label={name}
          value={id}
          icon={iconMap[name]}
        />
      ))}
    </div>
  );
};

export default Categories;
