
// categories
const loadCategories = async() => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await response.json();
    displayCategories(data.categories);
}

// all pets

const loadAllPets = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await res.json();
    displayPets(data.pets);

}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for(const button of buttons){
        button.classList.remove("bg-activeBg", "border-activeBorder", "rounded-full");
    }
};

const loadCategoryPet = (petName) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${petName}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${petName}`);
        activeBtn.classList.add("bg-activeBg", "border-activeBorder", "rounded-full");
        displayPets(data.data);
    })
    .catch(error => console.log(error));
}


const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach(item => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category}" class="category-btn flex justify-center items-center font-bold px-10 py-3 border gap-3" onclick="loadCategoryPet('${item.category}')"><img class="w-10 h-10" src="${item.category_icon}"> ${item.category}</button>
        `;
        categoryContainer.append(buttonContainer);
    });
}

const displayPets = (pets) => {
    const petContainer = document.getElementById("pets");
    petContainer.innerHTML = "";

    if(!pets.length){
        petContainer.classList.remove('grid');
        petContainer.innerHTML = `
        <div class="min-h-[400px] w-full flex flex-col justify-center items-center gap-5">
            <img src="images/error.webp" alt="">
            <h2 class="font-bold text-center text-xl">No content here in this category</h2>
        </div>
        `;
      return;
    }
    else{
        petContainer.classList.add('grid');
    }

    pets.forEach(pet => {
        const card = document.createElement("div");
        card.classList = "card border"
        card.innerHTML = `
        <figure class="px-5 pt-5">
        <img
          src="${pet.image}"
          alt=""
          class="rounded-xl h-full w-full object-cover"
        />
      </figure>
      <div class="p-5">
        <h2 class="font-bold font-inter text-xl">${pet.pet_name}</h2>
        <div class="font-lato text-gray-500">
        <p><i class="fa-solid fa-shield-cat"></i> Breed: ${pet.breed ? pet.breed : "Not available"}</p>
        <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not available"}</p>
        <p><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender ? pet.gender : "Not available"}</p>
        <p>$ Price: ${pet.price ? pet.price : "Not available"}</p>
        </div>
      </div>
        `;
        petContainer.append(card);
    });
}


loadCategories();
loadAllPets();