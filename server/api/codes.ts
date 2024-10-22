async function fetchCodes(
  codes: string[],
): Promise<{ id: string; label: string }[]> {
  const returnArray = () =>
    Array.from(cache.entries()).map(([id, label]) => ({
      id,
      label,
    }));

  if (cache.entries().length) {
    return returnArray();
  }
  const promises = codes.map((code) =>
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`,
    ).then((e) => e.json()),
  );
  await Promise.all(promises).then((data) =>
    data.forEach(({ drinks: [item] }, index) =>
      cache.set(codes[index], item.strDrink),
    ),
  );

  return returnArray();
}

const cache: Map<string, string> = new Map();
export default defineEventHandler(async () =>
  fetchCodes(useRuntimeConfig().public.cocktailCodes),
);
