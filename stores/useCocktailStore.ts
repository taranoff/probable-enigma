import { useLocalStorage } from "@vueuse/core";
import type {
  FieldIndexes,
  TCocktail,
  TCocktailApiResponse,
} from "~/stores/TCocktail";
import { reactive } from "vue";
import type { AsyncDataRequestStatus } from "#app";

export const useCocktailStore = defineStore("cocktail-store", () => {
  const localStore = useLocalStorage<Record<string, TCocktail>>(
    "cocktail-cache",
    {},
  );

  const availableCocktails = useRuntimeConfig().public.cocktailCodes;

  const state = reactive<{
    currentCocktail: TCocktail | undefined;
    currentCocktailID: string;
    loadingState: AsyncDataRequestStatus;
  }>({
    loadingState: "idle",
    currentCocktailID: availableCocktails[0],
    currentCocktail: undefined,
  });

  const currentCocktailIngredients = computed(() => {
    if (typeof state.currentCocktail === "undefined") return [];
    const recipe = state.currentCocktail;

    const ingredients = Object.keys(recipe)
      .filter((key: string) => key.match(/strIngredient/))
      .reduce<TIngredient[]>((acc: TIngredient[], k: string): TIngredient[] => {
        const key = k as keyof typeof recipe;
        const index = +key.replace(/[\D]/g, "") as FieldIndexes;
        if (isFinite(index) && typeof recipe[key] === "string") {
          acc.push({
            id: index,
            ingredient: recipe[key] as string,
            measure: (recipe[`strMeasure${index}`] || "") as string,
          });
        }
        return acc;
      }, [] as TIngredient[]);
    ingredients.sort((a: TIngredient, b: TIngredient) => a.id - b.id);
    return ingredients;
  });

  const fetchCocktail = async (
    cocktailID: string | undefined,
  ): Promise<TCocktail | null> => {
    if (!cocktailID) return null;

    state.currentCocktailID = cocktailID;

    if (localStore.value?.[cocktailID]) {
      const recipe = localStore.value[cocktailID];
      state.loadingState = "success";
      state.currentCocktail = recipe;
      return recipe;
    }

    const url = new URL(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php",
    );
    url.searchParams.set("s", cocktailID);

    try {
      state.loadingState = "pending";

      const { data } = await useFetch<TCocktailApiResponse>(url.toString());
      state.loadingState = "success";
      const [recipe] = data.value?.drinks as TCocktail[];

      if (typeof recipe === "undefined") throw new Error("No recipe found");
      // recipe = { ...recipe };

      localStore.value = { ...localStore.value, [cocktailID]: recipe };
      state.loadingState = "success";

      state.currentCocktail = recipe;

      return recipe;
    } catch (e) {
      state.loadingState = "error";
      console.error(e);
      return null;
    }
  };

  return {
    state,
    availableCocktails,
    fetchCocktail,
    currentCocktailIngredients,
  };
});
