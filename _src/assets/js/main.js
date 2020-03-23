'use strict';
const inputName = document.querySelector('#main__input');
const searchButton = document.querySelector('#button-search');
const ulList = document.querySelector('.main__list');
const favList = document.querySelector('.aside__list');
const URL = 'http://api.tvmaze.com/search/shows?q=';
const placeholderURL = 'https://via.placeholder.com/210x295/ffffff/666666/?';
let seriesTV = null;
let seriesFound = readFoundLocalStorage()
const favSeries = readFavsLocalStorage()


//función que hace la petición a la API//
function getSerieName() {
    fetch(`http://api.tvmaze.com/search/shows?q=${inputName.value}`)
        .then(response => response.json())
        .then(data => {
            seriesTV = data
            for (let item of data) {
                seriesFound.push(item)
            }
            showSerieList(seriesTV)
        })
}

//función que pinta las series//
function showSerieList(seriesTV) {
    let list = ``;
    for (const serie of seriesTV) {
        let favclass = '';
        if (favSeries.indexOf(serie.show.id.toString()) !== -1) {
            favclass = 'fav'
        }
        if (serie.show.image !== null) {
            list += `<li class="${favclass}" id="${serie.show.id}"><p>${serie.show.name}</p><img src=${serie.show.image.medium}>`
        } else {
            list += `<li class="${favclass}" id="${serie.show.id}"><p>${serie.show.name}</p><img src=${placeholderURL}>`
        }
    }
    ulList.innerHTML = list
    addSerieLiListener()
}

//función para añadir los listeners al li//
function addSerieLiListener() {
    const serieLi = document.querySelectorAll('.main__list li')
    for (const li of serieLi) {
        li.addEventListener('click', onclickLi);
    }
}

// función que atiende a lo que pasa al clicar en el botón search//
function onclickLi(event) {
    addFavSeries(event.currentTarget.id);
    addFavLocalStorage();
    addSeriesFoundLocalStorage();
    showFavSeries();
}

// función para añadir las series favoritas al array favSeries//
function addFavSeries(id) {
    if (favSeries.indexOf(id) === -1) {
        favSeries.push(id)
    }
}

function getSerieObject(id) {
    return seriesFound.find(serie => serie.show.id === parseInt(id))
}

//función que muestra la lista de favoritos//
function showFavSeries() {
    favList.innerHTML = '';
    for (const favSerie of favSeries) {
        const object = getSerieObject(favSerie)
        if (favSerie == object.show.id) {
            let favLi = document.createElement('li');
            let buttonLi = document.createElement('button');
            let textLi = document.createElement('p');
            let imgLi = document.createElement('img');
            if (object.show.image !== null) {
                imgLi.setAttribute('src', `${object.show.image.medium}`);
            } else {
                imgLi.setAttribute('src', `${placeholderURL}`);
            }
            favLi.setAttribute('id', `${object.show.id}`);
            textLi.innerText = `${object.show.name}`;
            buttonLi.innerText = `X`;
            favLi.appendChild(buttonLi)
            favLi.appendChild(textLi);
            favLi.appendChild(imgLi);
            favList.appendChild(favLi);
            buttonLi.addEventListener('click', onClickFav)
        }
    }
    const deleteAll = document.createElement('button');
    deleteAll.innerText = 'Borrar';
    favList.appendChild(deleteAll);
    deleteAll.addEventListener('click', removeAllFav);
}

//función para guardar en el localstorage//
function addFavLocalStorage() {
    localStorage.setItem('favourites', JSON.stringify(favSeries))

}
function addSeriesFoundLocalStorage() {
    localStorage.setItem('seriesFound', JSON.stringify(seriesFound));
}

//función para leer el localsotrage//
function readFavsLocalStorage() {
    let localInfo = JSON.parse(localStorage.getItem('favourites'));
    if (localInfo !== null) {
        return localInfo
    } else {
        return localInfo = []
    }
}
function readFoundLocalStorage() {
    let localInfo = JSON.parse(localStorage.getItem('seriesFound'))
    if (localInfo !== null) {
        return localInfo
    } else {
        return localInfo = []
    }
}

//función que atiende al click del butón de cada li//
function onClickFav(event) {
    const idSelected = event.currentTarget.parentElement.id;
    console.log(event.currentTarget)
    removeFavSeries(idSelected);
    addFavLocalStorage()
    showFavSeries()
}

//función que borra el li //
function removeFavSeries(idSelected) {
    const index = favSeries.indexOf(idSelected)
    console.log(index)
    favSeries.splice(index, 1)
}

//función que atiende al click del botón borrar y que borra todo el array//
function removeAllFav() {
    favSeries.splice(0, favSeries.length);
    addFavLocalStorage()
    showFavSeries()
}


showFavSeries()
searchButton.addEventListener('click', getSerieName);



