// ==UserScript==
// @name         Flotta 2.0
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Barra di ricerca fissa che filtra le flotte sulla pagina, con evidenziazione verde quando trova la corrispondenza.
// @author       Your Name
// @match        https://play.staratlas.com/rentals/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Crea la barra di ricerca
    const searchBar = document.createElement('div');
    searchBar.style.position = 'fixed';
    searchBar.style.top = '50%';
    searchBar.style.right = '120px'; // Sposta ancora un po' più a sinistra
    searchBar.style.transform = 'translateY(-50%)';
    searchBar.style.background = '#fff';
    searchBar.style.padding = '20px';
    searchBar.style.borderRadius = '15px'; // Arrotonda gli angoli
    searchBar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    searchBar.style.zIndex = '1000';
    searchBar.style.width = '300px';
    searchBar.style.textAlign = 'center';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Cerca flotta';
    searchInput.style.width = '100%';
    searchInput.style.padding = '10px';
    searchInput.style.fontSize = '16px';
    searchInput.style.border = 'none'; // Rimuovi il bordo
    searchInput.style.borderRadius = '5px';

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Cerca';
    searchButton.style.marginTop = '10px';
    searchButton.style.padding = '10px 20px';
    searchButton.style.fontSize = '16px';
    searchButton.style.border = 'none';
    searchButton.style.borderRadius = '5px';
    searchButton.style.background = '#007BFF';
    searchButton.style.color = '#fff';
    searchButton.style.cursor = 'pointer';

    searchButton.addEventListener('click', searchText);

    searchBar.appendChild(searchInput);
    searchBar.appendChild(searchButton);
    document.body.appendChild(searchBar);

    // Funzione per filtrare le flotte
    function searchText() {
        const searchValue = searchInput.value.toLowerCase();
        if (searchValue === '') return;

        const fleetElements = document.querySelectorAll('.styles__Card-ipmGKK.hmOJds'); // Seleziona gli elementi delle flotte
        if (fleetElements.length === 0) {
            console.log('No fleet elements found on the page.');
            return;
        }

        console.log(`Found ${fleetElements.length} fleet elements on the page.`);

        let found = false;

        fleetElements.forEach(fleet => {
            const fleetName = fleet.querySelector('.styles__Title-jrZlpk.hrOaHR').textContent.toLowerCase(); // Seleziona il nome della flotta
            if (fleetName.includes(searchValue)) {
                fleet.style.display = 'block';
                searchInput.style.backgroundColor = 'green'; // Colora il background della barra di input di verde
                if (!found) {
                    fleet.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
            } else {
                fleet.style.display = 'none';
            }
        });

        if (!found) {
            console.log('Keyword not found, showing all fleets...');
            searchInput.style.backgroundColor = 'red'; // Colora il background della barra di input di rosso se non trova
            fleetElements.forEach(fleet => {
                fleet.style.display = 'block';
            });
        }
    }
})();
