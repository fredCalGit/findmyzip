import countries from "../utils/countriesList";

export const useCountriesList = () => {
  const countriesList = Object.keys(countries);
  const aliasList = Object.values(countries);

  return {
    data: {
      countriesList,
      aliasList,
      countries,
    },
  };
};
