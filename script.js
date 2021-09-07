const apikey = "563492ad6f91700001000001c3cf33b583f04645ab86a54c7d052b42"
const input = document.querySelector("input");

const searchButton = document.querySelector(".search_button")

const showMoreButton = document.querySelector(".show_more")


let pageNumber = 1;
let searchText = "";
let search = false;

// event listener

input.addEventListener("input", function (event) {
    event.preventDefault();
    searchText = event.target.value;

})

searchButton.addEventListener("click", function () {
    if (input.value === "") {
        alert("Please enter some text")
        return;
    }
    clearGallery();
    search = true;
    searchPhotos(searchText, pageNumber)

})


// clear the gallery
function clearGallery() {
    document.querySelector(".display_images").innerHTML = "";
    pageNumber = 1;
}

// async await

async function CuratedPhotos(pageNumber) {
    // fetching data 

    const data = await fetch(`https://api.pexels.com/v1/curated?page=${pageNumber}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        }
    })
    const response = await data.json();
    console.log(response);

    displayImages(response)
}

// display images

function displayImages(response) {
    response.photos.forEach((image) => {
        const photo = document.createElement("div");
        photo.innerHTML = `<img src = ${image.src.large}>
            <figcaption> Photo By: ${image.photographer}📷</figcaption>    
        `
        document.querySelector(".display_images").appendChild(photo)
    })
}

// search function

async function searchPhotos(query, pageNumber) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${pageNumber}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        }
    })

    const response = await data.json()
    console.log(response)

    displayImages(response)
}

// show more button

showMoreButton.addEventListener("click", function () {
    if (!search) {
        pageNumber++;
        CuratedPhotos(pageNumber)
    }
    else {
        if (searchText.value === "")
            pageNumber++;
        searchPhotos(searchText, pageNumber);
        return;
    }
})

CuratedPhotos(pageNumber);