
const url ="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

const newUrl = new URL(url);
console.log(newUrl);

const searchParams = new URLSearchParams(newUrl, search);
console.log(searchParams);

console.log(searchParams.get("s"));