const statusText = document.getElementById("status");
const breedSelect = document.getElementById("breedSelect");

document.getElementById("toggleMode").onclick = () => {
  document.body.classList.toggle("dark");
};

// Load dog breeds
async function loadBreeds() {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await res.json();
  const breeds = Object.keys(data.message);

  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    breedSelect.appendChild(option);
  });
}
loadBreeds();

async function getCat() {
  const loader = document.getElementById("catLoader");
  loader.style.display = "block";
  statusText.innerText = "Loading cat...";

  try {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    document.getElementById("catImg").src = data[0].url;
    statusText.innerText = "Cat loaded!";
  } catch {
    statusText.innerText = "Error loading cat.";
  }

  loader.style.display = "none";
}

async function getDog() {
  const loader = document.getElementById("dogLoader");
  loader.style.display = "block";
  statusText.innerText = "Loading dog...";

  try {
    const breed = breedSelect.value;
    let url = breed
      ? `https://dog.ceo/api/breed/${breed}/images/random`
      : "https://dog.ceo/api/breeds/image/random";

    const res = await fetch(url);
    const data = await res.json();
    document.getElementById("dogImg").src = data.message;
    statusText.innerText = "Dog loaded!";
  } catch {
    statusText.innerText = "Error loading dog.";
  }

  loader.style.display = "none";
}

function downloadImage(id) {
  const img = document.getElementById(id);
  const link = document.createElement("a");
  link.href = img.src;
  link.download = "image.jpg";
  link.click();
}