setTimeout(() => {
  document.body.innerHTML = document.body.innerHTML + (` <div id="devSnackbar" style="font-family: monospace;position: sticky;bottom: 10px;left: calc(100vw - 150px);border: #000000 1px solid;text-align: center;padding: 10px;margin: 10px;border-radius: 10px;font-size: 1em;background-color: #FFF4E6;width: 150px;">Made by <a href="https://github.com/theatom06/" style="color: rgb(245, 86, 86);">theatom06</a></div>`)
}, 1000);

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBye8eDUC8mZ_hx3hpK-LmgibSCUs-FRl8",
  authDomain: "shadesposters.firebaseapp.com",
  projectId: "shadesposters",
  storageBucket: "shadesposters.firebasestorage.app",
  messagingSenderId: "261175884216",
  appId: "1:261175884216:web:c23500b0195093c0e6f74d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let posterListUrl = 'https://shadesposters.github.io/posters/details.json';
let posterList = {};

fetch(posterListUrl)
  .then(response => response.json())
  .then(data => {
    posterList = data;
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    cart.forEach((slug) => {
      const ordernowElement = document.querySelector('.orderwrapper');
      const cartContainer = document.createElement('div');
      cartContainer.classList.add('cart-container');
      cartContainer.appendChild(createCard(slug));
      document.body.insertBefore(cartContainer, ordernowElement);
    });
  });

function createCard(slug) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('products');
  wrapper.classList.add('card')

  const img = document.createElement('img');
  img.id = `img-${slug}`;
  img.src = `https://shadesposters.github.io/posters/${posterList.posters[slug].filepath}`;
  img.loading = 'lazy';
  img.alt = posterList.posters[slug].name || 'A4 Poster';
  img.setAttribute('size', 'A4');

  const div = document.createElement('div');
  div.classList.add('product-info');

  const h1 = document.createElement('h1');
  h1.innerText = posterList.posters[slug].name || 'A4 Poster';

  const h2 = document.createElement('h2');
  h2.innerText = 'Price: 50/-';

  const toggleDiv = document.createElement('div');
  toggleDiv.classList.add('toggle');

  const A4Button = document.createElement('button');
  A4Button.innerText = 'A4';
  A4Button.classList.add('active');
  A4Button.classList.add('left');
  A4Button.onclick = () => {
    console.log('A4 clicked');
  }

  const A5Button = document.createElement('button');
  A5Button.innerText = 'A5';
  A5Button.classList.add('right');

  A5Button.setAttribute('data-type', 'sizeButton');
  A4Button.setAttribute('data-type', 'sizeButton');

  toggleDiv.append(A4Button, A5Button);


  div.append(h1, h2, toggleDiv);
  wrapper.append(img, div);
  return wrapper;
}

document.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    if (event.target.getAttribute('data-type') == 'sizeButton') {

      const parent = event.target.parentElement;
      const buttons = parent.querySelectorAll('button');
      buttons.forEach((button) => button.classList.remove('active'));
      event.target.classList.add('active');

      if (event.target.innerText === 'A4') {
        event.target.parentElement.parentElement.parentElement.querySelector('img').setAttribute('size', 'A4');
        parent.parentElement.querySelector('h1').innerText = parent.parentElement.querySelector('h1').innerText.replace('A5', 'A4');
        parent.parentElement.querySelector('h2').innerText = parent.parentElement.querySelector('h2').innerText.replace('25', '50');
      } else {
        event.target.parentElement.parentElement.parentElement.querySelector('img').setAttribute('size', 'A5');

        parent.parentElement.querySelector('h1').innerText = parent.parentElement.querySelector('h1').innerText.replace('A4', 'A5');
        parent.parentElement.querySelector('h2').innerText = parent.parentElement.querySelector('h2').innerText.replace('50', '25');
      }
    } else if (event.target.getAttribute('data-type') == 'order') {
      console.log('Order now clicked');
  const nameInput = document.querySelector('#name');    
  const modeOfEnquiry = document.querySelector('#modeOfEnquiry');
  const modeOfDelivery = document.querySelector('#modeOfDelivery');
  const requests = document.querySelector('#requests');

  const posters = []; 
  document.querySelectorAll('.products').forEach((product) => {
    const img = product.querySelector('img');
    const size = img.getAttribute('size');
    const slug = img.id.split('-')[1];
    posters.push({
      slug,
      size
    });
  });
  
  const order = {
    name: nameInput.value,
    modeOfEnquiry: modeOfEnquiry.value,
    modeOfDelivery: modeOfDelivery.value,
    requests: requests.value,
    posters
  };

  const ordersCollection = collection(db, 'orders');
  addDoc(ordersCollection, order)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      alert('Order placed successfully');
      localStorage.setItem('cart', JSON.stringify([]));
      window.location.href = '/';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
    }
  } 
});