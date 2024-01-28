$(document).ready(() => {
    searchByName("").then(() => {
        $("body").css("overflow", "visible")
    })
})

function openNav() {
    $(".sideNav").animate({
        left: 0
    }, 500)

    $(".open-close-btn").addClass("fa-x");

}

function closeNav() {
    let width = $(".navBar").outerWidth()
    $(".sideNav").animate({
        left: -width
    }, 500)

    $(".open-close-btn").removeClass("fa-x");

}

closeNav()
$("button.open-close-btn").click(() => {
    if ($(".sideNav").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})

let main = document.getElementById("main");

function displayMeals(list) {
    let cartona = "";

    for (let i = 0; i < list.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div " class="img position-relative overflow-hidden">
                    <img class="w-100" src="${list[i].strMealThumb}" alt="">
                    <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${list[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }
    main.innerHTML = cartona
}

async function getCategories() {
    main.innerHTML = ""
    search.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
}

function displayCategories(list) {
    let cartona = ""
    for (let i = 0; i < list.length; i++) {
        cartona += `
        <div class="col-md-3">
         <div onclick="getCategoryMeals('${list[i].strCategory}')" class="img position-relative cursor-pointer overflow-hidden ">
          <img class="w-100" src="${list[i].strCategoryThumb}">
            <div class="layer position-absolute text-center text-black p-2">
            <h3>${list[i].strCategory}</h3>
             <p>${list[i].strCategoryDescription}</p>
            </div>
                </div>
        </div>
        `
    }
    main.innerHTML = cartona
}

async function getCategoryMeals(category) {
    main.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals)

}

async function getArea() {
    main.innerHTML = ""
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
}
function displayArea(list) {
    let cartona = "";
    for (let i = 0; i < list.length; i++) {
        cartona += `
        <div class="col-md-3">
         <div onclick="getAreaMeals('${list[i].strArea}')" class=" cursor-pointer text-center">
            <i class="fa-solid fa-laptop fa-4x"></i>
                <h3>${list[i].strArea}</h3>
                </div>
        </div>
        `
    }
    main.innerHTML = cartona
}
async function getAreaMeals(area) {
    area.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals)
}

async function getIngredients() {
    main.innerHTML = ""
    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    
    displayIngredients(respone.meals)
}

function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class=" text-center cursor-pointer">
                        <i class="fa-solid fa-house fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription}</p>
                </div>
        </div>
        `
    }
    main.innerHTML = cartoona
}

async function getIngredientsMeals(ingredients) {
    main.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()

    displayMeals(response.meals)
    
}

let search = document.getElementById("search");
function inputs() {
    search.innerHTML = `
    <div class="row ">
        <div class="col-md-6 mt-5 ">
            <input onkeyup="searchByName(this.value)" class="form-control text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6 mt-5 ">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    main.innerHTML = ""
}

async function searchByName(name) {
    main.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
}

async function searchByFLetter(letter) {
    main.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
}

let submitBtn;
function ContactUs() {
    main.innerHTML = `<div class="d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                   <p> Special characters and numbers not allowed  </p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                <p> Email not valid *exemple@yyy.zzz  </p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                <p>Enter valid Phone Number </p>
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                <p>Enter valid age </p>
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                <p>Enter valid password *Minimum eight characters, at least one letter and one number:* </p>
                </div>
            </div>
            <div class="col-md-6">
                <input  id="retypePassword" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Retype your password">
                <div id="retypePasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                <p> Enter valid repassword </p>
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-danger m-4">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("name").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("email").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phone").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("age").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("password").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("retypePassword").addEventListener("focus", () => {
        retypePasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let retypePasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (retypePasswordInputTouched) {
        if (retypePasswordValidation()) {
            document.getElementById("retypePasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("retypePasswordAlert").classList.replace("d-none", "d-block")

        }
    }
    function nameValidation() {
        return (/^[a-zA-Z ]+$/.test(document.getElementById("name").value))
    }
    
    function emailValidation() {
        return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value))
    }
    
    function phoneValidation() {
        return (/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(document.getElementById("phone").value))
    }
    
    function ageValidation() {
        return (/^[1-9]\d*$/.test(document.getElementById("age").value))
    }
    
    function passwordValidation() {
        return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(document.getElementById("password").value))
    }
    
    function retypePasswordValidation() {
        return document.getElementById("retypePasswordAlert").value == document.getElementById("retypePassword").value
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        retypePasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}