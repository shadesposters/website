setTimeout(() => {
    const devSnackbar = document.createElement('div');
    devSnackbar.id = 'devSnackbar';
    devSnackbar.style = `
        font-family: monospace;
        position: sticky;
        bottom: 10px;
        left: 10px;
        border: #000000 1px solid;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
        font-size: 1em;
        background-color: #FFF4E6;
        width: 150px;
    `;
    devSnackbar.innerHTML = 'Made by <a href="https://github.com/theatom06/" style="color: rgb(245, 86, 86);">theatom06</a>';
    document.body.appendChild(devSnackbar);
}, 1000);

if(parseInt(localStorage.getItem('warning')) > 6) {
    document.body.innerHTML = 'You Have Been Banned';
}

// Fetch poster list from URL
const posterListUrl = 'https://shadesposters.github.io/posters/details.json';

// Create a card element for a poster object
function createCard(object, slug) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('card');
    wrapper.id = `card-${slug}`;

    const img = document.createElement('img');
    img.id = `img-${slug}`;
    img.src = `https://shadesposters.github.io/posters/${object.filepath}`;
    img.loading = 'lazy';

    const button = document.createElement('button');
    button.setAttribute('data-slug', slug);
    button.innerText = 'Add to Cart';
    button.id = 'poster-button';

    wrapper.append(img, button);
    return wrapper;
}

// Fetch poster data and populate the gallery
fetch(posterListUrl)
    .then(response => response.json())
    .then(data => {
        const filterBar = document.querySelector('div.filterbar');
        const keywords = data.keywords;

        keywords.forEach(keyword => {
            const button = document.createElement('button');
            button.innerText = keyword;
            button.classList.add('chip');
            button.onclick = () => {
                const gallery = document.querySelector('div.gallery');
                gallery.innerHTML = '';
                Object.entries(data.posters).forEach(([slug, poster]) => {
                    if (poster.keywords.includes(keyword)) {
                        const card = createCard(poster, slug);
                        gallery.appendChild(card);
                    }
                });
            };
            filterBar.appendChild(button);
        });

        const gallery = document.querySelector('div.gallery');
        Object.entries(data.posters).forEach(([slug, poster]) => {
            const card = createCard(poster, slug);
            gallery.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching poster list:', error);
    });

// Handle click events on the document
document.addEventListener('click', event => {
    if (event.target.id !== 'poster-button') return;

    const slug = event.target.getAttribute('data-slug');
    const card = document.getElementById(`card-${slug}`);
    const img = document.getElementById(`img-${slug}`);

    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        event.target.style.backgroundColor = 'var(--primary)'
        event.target.innerText = 'Add to Cart';
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const newCart = currentCart.filter(item => item !== slug);
        localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
        card.classList.add('selected');
        event.target.innerText = 'Remove from Cart';
        event.target.style.backgroundColor = '#fb5c5c';
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        currentCart.push(slug);
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }
})