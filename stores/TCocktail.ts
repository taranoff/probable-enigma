export type FieldIndexes =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

type IngredientKeys = `strIngredient${FieldIndexes}`;
type MeasureKeys = `strMeasure${FieldIndexes}`;
type PrefixedFields = {
  [key in IngredientKeys | MeasureKeys]: string | null;
};

export type TCocktail = {
  strDrinkThumb: string | null;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  ingredients: { id: number; ingredient: string; measure: string }[];
} & PrefixedFields;

export type TCocktailApiResponse = {
  drinks: TCocktail[] | null;
};

export {};
