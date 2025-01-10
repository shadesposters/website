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

const posterListUrl = 'https://shadesposters.github.io/posters/details.json';
const posterList = {}

async function populatePosterList() {
    const response = await fetch(posterListUrl);
    const data = await response.json();
    return data; 
}

await populatePosterList().then(data => {
    for (const [key, value] of Object.entries(data.posters)) {
        posterList[key] = value;
    }
});


class Cart {
    constructor() {
        this.cart = [];

        if(!localStorage.getItem('cart') || JSON.parse(localStorage.getItem('cart')).length === 0) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    
        this.cart = JSON.parse(localStorage.getItem('cart'));
    }

    add(slug) {
        this.cart.push(slug);
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    remove(slug) {
        const index = this.cart.indexOf(slug);
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}

const cart = new Cart();



document.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        console.log('Link clicked');
        const url = event.target.href;

        if (url.includes('instagram') || url.includes('facebook') || url.includes('twitter')) {
            console.log('External link clicked');
            return;
        } else {
            event.preventDefault();
            const page = url.split('/').pop();
            const currentUrl = new URL(window.location.href);
            const newUrl = currentUrl.origin + '/' + page;
            let pageHtml;

            fetch(newUrl)
                .then(response => response.text())
                .then(html => {
                    pageHtml = html;
                    document.body.innerHTML = pageHtml;
                    location.href = newUrl;
                    console.log('Page loaded successfully');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };
});

export { cart, posterList };
