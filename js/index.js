import { posterList, cart } from "./root.js";


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



/* keywords.forEach(keyword => {
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
        }); */

const gallery = document.querySelector('div.gallery');
        
Object.entries(posterList).forEach(([slug, poster]) => {
    const card = createCard(poster, slug);
    gallery.appendChild(card);
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