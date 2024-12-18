export async function fetchApi() {
  const res = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/fart"
  );
  const data = await res.json();

  return data;
}
