export function fetchAllCategories() {
  const promise = fetch(
    `${process.env.REACT_APP_API_URL}/categories/?_embed=parentCategory`,
  );

  return promise;
}
