'use strict';
const inputName = document.querySelector('#main__input');
const searchButton = document.querySelector('#button-search');
const ulList = document.querySelector('.main__list');
const URL = 'http://api.tvmaze.com/search/shows?q='

function getSerieName(){

    console.log(inputName.value)
    fetch(`http://api.tvmaze.com/search/shows?q=${inputName.value}`)
    .then(response => response.json())
    .then(data =>{
        const seriesTV = data
        console.log(seriesTV)
        getSerieList(seriesTV)
        
     })
}

function getSerieList(seriesTV){
    let list= ``;
        for( const serie of seriesTV){
            list +=`<li><p>${serie.show.name}</p><img src=${serie.show.image.medium}>`
        }
        ulList.innerHTML=list
}

searchButton.addEventListener('click',getSerieName);
