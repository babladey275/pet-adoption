// categories
const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayCategories(data.categories);
};

// all pets

const loadAllPets = async () => {
  const petContainer = document.getElementById("pets");
  petContainer.classList.remove("grid");
  petContainer.innerHTML = `
  <p class="flex justify-center items-center"><span class="loading loading-bars loading-lg"></span></p>
  `;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();

  setTimeout(() => {
    displayPets(data.pets);
  }, 2000);
  // displayPets(data.pets);
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const button of buttons) {
    button.classList.remove(
      "bg-activeBg",
      "border-activeBorder",
      "rounded-full"
    );
  }
};

const loadCategoryPet = (petName) => {
  const petContainer = document.getElementById("pets");
  petContainer.classList.remove("grid");
  petContainer.innerHTML = `
  <p class="flex justify-center items-center"><span class="loading loading-bars loading-lg"></span></p>
  `;
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${petName}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${petName}`);
      activeBtn.classList.add(
        "bg-activeBg",
        "border-activeBorder",
        "rounded-full"
      );

      setTimeout(() => {
        displayPets(data.data);
      },2000);
      // displayPets(data.data);
    })
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button id="btn-${item.category}" class="category-btn flex justify-center items-center font-bold px-12 py-3 border gap-3" onclick="loadCategoryPet('${item.category}')"><img class="w-10 h-10" src="${item.category_icon}"> ${item.category}</button>
        `;
    categoryContainer.append(buttonContainer);
  });
};

const loadDetails = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);
};

const displayDetails = (petData) => {
  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `
    <img class="rounded-xl h-full w-full object-cover" src="${petData.image}">
    <div class="">
     <h2 class="font-bold font-inter text-xl py-3">${petData.pet_name}</h2>
        <div class="flex gap-10 font-lato text-xs text-gray-500">
        <div>
        <p><i class="fa-solid fa-shield-cat"></i> Breed: ${
          petData.breed ? petData.breed : "Not available"
        }</p>
        <p><i class="fa-solid fa-mercury"></i> Gender: ${
          petData.gender ? petData.gender : "Not available"
        }</p>
        <p><i class="fa-solid fa-mercury"></i> Gender: ${
          petData.vaccinated_status
            ? petData.vaccinated_status
            : "Not available"
        }</p>
        </div>
        <div>
        <p><i class="fa-regular fa-calendar"></i> Birth: ${
          petData.date_of_birth ? petData.date_of_birth : "Not available"
        }</p>
        <p>$ Price: ${petData.price ? petData.price : "Not available"}</p>
        </div>
        </div>
        <div class="font-inter">
        <h2 class="font-bold text-[16px] py-3">Details Information</h2>
        <p class="text-gray-500 text-xs">${petData.pet_details}</p>
        </div>
    </div
    `;

  document.getElementById("customModal").showModal();
};

const loadLikeImg = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayLikeImg(data.petData);
};

const displayLikeImg = (petData) => {
  const likeImgContainer = document.getElementById("like-img");

  const card = document.createElement("div");
  card.classList = "card border p-2";
  card.innerHTML = `
    <img class="rounded-lg h-full w-full object-cover" src="${petData.image}">
    `;

  likeImgContainer.append(card);
};

const displayPets = (pets) => {
  const petContainer = document.getElementById("pets");
  petContainer.innerHTML = "";

  if (!pets.length) {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
        <div class="min-h-[400px] w-full bg-gray-100 rounded-xl flex flex-col justify-center items-center gap-5">
            <img src="images/error.webp" alt="">
            <h2 class="font-bold font-inter text-center text-2xl">No Information Available</h2>
        </div>
        `;
    return;
  } else {
    petContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card border";
    card.innerHTML = `
        <figure class="px-5 pt-5">
        <img
          src="${pet.image}"
          alt=""
          class="rounded-xl h-full w-full object-cover"
        />
      </figure>
      <div class="p-5">
        <h2 class="font-bold font-inter text-xl pb-3">${pet.pet_name}</h2>
        <div class="font-lato text-gray-500">
        <p><i class="fa-solid fa-shield-cat"></i> Breed: ${
          pet.breed ? pet.breed : "Not available"
        }</p>
        <p><i class="fa-regular fa-calendar"></i> Birth: ${
          pet.date_of_birth ? pet.date_of_birth : "Not available"
        }</p>
        <p><i class="fa-solid fa-mercury"></i> Gender: ${
          pet.gender ? pet.gender : "Not available"
        }</p>
        <p>$ Price: ${pet.price ? pet.price : "Not available"}</p>
        </div>
        <div class="flex justify-between mt-6">
        <button onclick="loadLikeImg(${
          pet.petId
        })" class="btn btn-sm bg-base-100 border"><i class="fa-solid fa-thumbs-up"></i></button>
        <button onclick="congratsModal()" class="btn btn-sm bg-base-100 border text-[#0E7A81] font-bold">Adopt</button>
        <button onclick="loadDetails(${
          pet.petId
        })" class="btn btn-sm bg-base-100 border text-[#0E7A81] font-bold">Details</button>
        </div>
      </div>
        `;
    petContainer.append(card);
  });
};

const congratsModal = () => {
  const countContainer = document.getElementById("countdown");
  const adoptModal = document.getElementById("adoptModal");
  adoptModal.showModal();
  let num = 3;
  countContainer.innerHTML= `
    <p>${num}</p>
    `;
  const clockId = setInterval(() => {
    num--;
    if(num > 0) {
        countContainer.innerHTML= `<p>${num}</p>`;
    }
    if (num < 1) {
        clearInterval(clockId);
        adoptModal.close();
    }
  }, 1000);
};

loadCategories();
loadAllPets();
