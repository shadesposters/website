import { posterList, cart } from './root.js';

let cartSet = new Set();

function createCard(object, slug) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('card');
    wrapper.id = `c-${slug}`;
    wrapper.setAttribute('data-slug', slug);

    const img = document.createElement('img');
    img.src = `https://shadesposters.github.io/posters/${object.filepath}`;
    img.loading = 'lazy';

    const quantity = document.createElement('div');
    quantity.classList.add('quantity');
    quantity.setAttribute('data-slug', slug);

    const button1 = document.createElement('button');
    button1.innerHTML = '<span class="material-symbols-outlined" data-type="add"> add </span>';
    button1.setAttribute('data-slug', slug);
    button1.setAttribute('data-type', 'add');

    const input = document.createElement('input');
    input.type = 'number';
    input.setAttribute('data-slug', slug);
    input.value = 1;
    input.min = 0;

    const button2 = document.createElement('button');
    button2.innerHTML = '<span class="material-symbols-outlined" data-type="remove"> remove </span>';
    button2.setAttribute('data-slug', slug);
    button2.setAttribute('data-type', 'remove');

    quantity.append(button1, input, button2);

    wrapper.append(img, quantity);
    return wrapper;
}

if(cart.cart.length === 0) {
    document.querySelector('.gallery').innerHTML = '<h1 style="text-align: center;">Your Cart is Empty <br><br> <a href="/" class="returnLink">Go Back</a></h1>';
}

cart.cart.forEach(slug => {
    if(!posterList[slug]) {
        return;
    }

    console.log(slug, posterList[slug], cartSet);
    if(cartSet.has(slug)) {
        document.querySelector(`input[data-slug="${slug}"]`).value = parseInt(document.querySelector(`input[data-slug="${slug}"]`).value) + 1;
        return;
    }

    cartSet.add(slug);


    const card = createCard(posterList[slug], slug);
    card.classList.add('selected');
    document.querySelector('.gallery').appendChild(card);
});

document.addEventListener('click', event => {
    if(!event.target.matches('button') && !event.target.matches('span')) {
        return;
    }

    const slug = event.target.parentElement.parentElement.getAttribute('data-slug');
    const input = document.querySelector(`input[data-slug="${slug}"]`);

    if (event.target.getAttribute('data-type') === 'add') {
        cart.add(slug);
        input.value = parseInt(input.value) + 1;
    } else {
        if (input.value === '0') {
            return;
        }

        cart.remove(slug);
        input.value = parseInt(input.value) - 1;
    }
})