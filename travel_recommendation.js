// Grab DOM elements
const homeSection = document.getElementById('home-section');
const aboutSection = document.getElementById('about-section');
const contactSection = document.getElementById('contact-section');
const searchContainer = document.getElementById('search-container');

const navHome = document.getElementById('nav-home');
const navAbout = document.getElementById('nav-about');
const navContact = document.getElementById('nav-contact');

// Navigation click handlers
navHome.addEventListener('click', () => {
    homeSection.style.display = 'block';
    aboutSection.style.display = 'none';
    contactSection.style.display = 'none';
    searchContainer.style.display = 'flex'; // Show search on Home
});

navAbout.addEventListener('click', () => {
    homeSection.style.display = 'none';
    aboutSection.style.display = 'block';
    contactSection.style.display = 'none';
    searchContainer.style.display = 'none'; // Hide search on About
});

navContact.addEventListener('click', () => {
    homeSection.style.display = 'none';
    aboutSection.style.display = 'none';
    contactSection.style.display = 'block';
    searchContainer.style.display = 'none'; // Hide search on Contact
});

const searchInput = document.getElementById('search-input');
const btnSearch = document.getElementById('btn-search');
const btnClear = document.getElementById('btn-clear');
const resultsGrid = document.getElementById('results-grid');

// Task 6 & 7: Fetch and Search Logic
function searchRecommendations() {
    const keyword = searchInput.value.toLowerCase().trim();
    resultsGrid.innerHTML = ''; // Clear prior results

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let matches = [];

            // Task 7: Keyword matching rules
            if (keyword === 'beach' || keyword === 'beaches') {
                matches = data.beaches;
            } else if (keyword === 'temple' || keyword === 'temples') {
                matches = data.temples;
            } else if (keyword === 'country' || keyword === 'countries') {
                // For countries, we usually want to extract all individual cities inside them
                data.countries.forEach(country => {
                    matches.push(...country.cities);
                });
            } else {
                resultsGrid.innerHTML = '<p>No matching recommendations found. Try "beach", "temple", or "country".</p>';
                return;
            }

            // Task 8: Render the recommendations
            displayResults(matches);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Helper to generate the cards dynamically
function displayResults(places) {
    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.style.border = '1px solid #ccc';
        card.style.padding = '15px';
        card.style.borderRadius = '8px';

        card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px;">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        `;
        resultsGrid.appendChild(card);
    });
}

// Task 9: Clear Button Functionality
btnClear.addEventListener('click', () => {
    searchInput.value = '';
    resultsGrid.innerHTML = '';
});

// Bind search action to button click
btnSearch.addEventListener('click', searchRecommendations);