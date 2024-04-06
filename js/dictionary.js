function search() {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    const searchResults = document.getElementById("result-list");
    searchResults.innerHTML = "";

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.title === "No Definitions ") {
                searchResults.innerHTML = "<li>Empty results</li>";
            } else {
                const matchingEntries = data.filter(entry => entry.word.toLowerCase() === searchInput);
                if (matchingEntries.length > 0) {
                    matchingEntries.forEach(entry => {
                        const definition = entry.meanings[0].definitions[0].definition;
                        searchResults.innerHTML += `<li>${entry.word}: ${definition}</li>`;
                    });
                } 
            }
        });
}

document.getElementById("search-input").addEventListener("input", search);
