const list = document.getElementById("pokemonList");
const details = document.getElementById("details");

const getData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151", {
        method: "GET",
    });

    const data = await response.json();

    list.innerHTML = data.results.map(
        (pokemon) => `<div id="pokemonName">${pokemon.name.toUpperCase()}</div>`
    ).join('');
};

getData();

async function getpokeinfo(name){
    console.log(name);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`, {
        method: "GET",
    });
    const data = await response.json();

    const response2 = await fetch(data.species.url, {
        method: "GET",
    });
    const data2 = await response2.json();
    if(data.types.length > 1){
        details.innerHTML = `<div>
                                <div class="pokemonNameDetail">${name}</div>
                                <img class="pokemonImg" src="${data.sprites.front_default}" alt="Pokemon photo">
                                <span class="pokemonType ${data.types[0].type.name}">
                                    ${data.types[0].type.name}
                                </span>
                                <span class="pokemonType ${data.types[1].type.name}">
                                    ${data.types[1].type.name}
                                </span>

                                <div class="description">
                                    ${data2.flavor_text_entries[1].flavor_text}
                                </div>
                            </div>`

    }
    else{
        details.innerHTML = `<div>
                                <div class="pokemonNameDetail">${name}</div>
                                <img class="pokemonImg" src="${data.sprites.front_default}" alt="Pokemon photo">
                                <span class="pokemonType ${data.types[0].type.name}">
                                    ${data.types[0].type.name}
                                </span>
                                <div class="description">
                                    ${data2.flavor_text_entries[1].flavor_text}
                                </div>
                            </div>`
    }
}

list.addEventListener("click", function(e){
    if(e.target.id == "pokemonName"){
        getpokeinfo(e.target.innerHTML)
    }
})