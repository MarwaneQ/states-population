const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
const cities = []
fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))

function findMatch(wordToMatch,cities) {
    return cities.filter(place =>{

        let regex = new RegExp(wordToMatch,'gi')
        return place.city.match(regex) || place.state.match(regex)
    })
}
function displayMatches() {
    let matchArray = findMatch(this.value,cities)
    let html = matchArray.map(place =>{
        let regex = new RegExp(this.value,'gi')
        let cityNmae = place.city.replace(regex,`<span class="hi">${this.value}</span>`)
        return `
        <li>
            <span class="name">${cityNmae},${place.state}</span>
            <span class="population">${place.population}</span>
        </li>
        `
    }).join('')
    suggestion.innerHTML = html;
}
let searchInput = document.querySelector('.search')
let suggestion = document.querySelector('.suggestion')
searchInput.addEventListener('change',displayMatches)
searchInput.addEventListener('keyup',displayMatches)