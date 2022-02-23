$(function(){
    "use-strict";
    // banner js
    $('.banner_slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 1000,
        fade: true,
        cssEase: 'linear',
    });
})


// get the error field
const errorMsg = document.getElementById("error")

// search food function
const searchFood = () => {
    // get the input value
    const searchField = document.getElementById("search-food")
    const searchText = searchField.value
    searchField.value = ""

    // get error if search field is empty
    if(searchText == ""){
        errorMsg.innerText = "Please insert your food name for search!"
    }
    else{
        errorMsg.innerText = ""
        // fetch api data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
        .then(response => response.json())
        .then(data => displayFood(data.meals))
        .catch(error => displayError(error))
    }
}

// display error
const displayError = error => {
    errorMsg.innerText = "Sorry! No Food Found."
}

// display food in our website
const displayFood = meals => {
    const searchResult = document.getElementById("search-result")

    // clear previous search data
    searchResult.textContent = ""

    // get single food item
    meals.forEach(meal => {
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                <button class="food-details" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadFoodDetail(${meal.idMeal})">Food Details</button>
            </div>
        </div>
        `
        searchResult.appendChild(div)
    })
}

const loadFoodDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayFoodDetail(data.meals[0]))
}

const displayFoodDetail = (data) => {
    // get foor detail div
    const foodDetail = document.getElementById("food-details")

    // clear previous food
    foodDetail.textContent = '';

    // load food detail
    const div = document.createElement("div")
    div.innerHTML = `
    <h5>${data.strMeal}</h5>
    <img src="${data.strMealThumb}" class="card-img-top" alt="...">
    <p>${data.strInstructions.slice(0, 300)}</p>
    `
    foodDetail.appendChild(div)
}