'use strict';
const inputName = document.querySelector('#main__input');
const searchButton = document.querySelector('#button-search');
const ulList = document.querySelector('.main__list');
const favList = document.querySelector('.aside__list');
const URL = 'http://api.tvmaze.com/search/shows?q=';
const placeholderURL = 'https://via.placeholder.com/210x295/ffffff/666666/?';
const favSeries =[];

//función que hace la petición a la API//
function getSerieName() {
    fetch(`http://api.tvmaze.com/search/shows?q=${inputName.value}`)
        .then(response => response.json())
        .then(data => {
            const seriesTV = data
            getSerieList(seriesTV)

        })
}

//función que pinta las series//
function getSerieList(seriesTV) {
    let list = ``;
    for (const serie of seriesTV) {
        if (serie.show.image !== null) {
            list += `<li id=${serie.show.id}><p>${serie.show.name}</p><img src=${serie.show.image.medium}>`
        } else {
            list += `<li  id=${serie.show.id}><p>${serie.show.name}</p><img src=${placeholderURL}>`
        }
    }
    ulList.innerHTML = list
    addSerieLiListener()
}

//función para añadir los listeners al li//
function addSerieLiListener() {
    const serieLi = document.querySelectorAll('.main__list li')
    for (const li of serieLi) {
        li.addEventListener('click',getFavSeries);
    }
}

// función para añadir las series favoritas//
function getFavSeries(event){
 const serieSelected= event.currentTarget.id
 console.log(serieSelected)
 favSeries.push(serieSelected)
 
}
console.log(favSeries)

searchButton.addEventListener('click', getSerieName);
