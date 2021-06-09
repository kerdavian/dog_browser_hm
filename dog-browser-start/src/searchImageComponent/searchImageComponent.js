import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent';
import yall from 'yall-js';
import preloading from '../img/preloading.gif';


class SearchImage extends ContentComponent {

  constructor() {
    super();
    // példányosításkor, megjelenítjük a keresőt automatikusan
    this.render();
  }





  // megjeleníti a keresőt:
  render() {
    const markup = `
    <form class="dog-search">
      <span class="search-icon"></span>
      <input type="text" id="dogSearchInput">
      <input type="text" id="imageNumberInput" placeholder="1">
      <button>Search</button>
    </form>
    `;
    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    // az arrow functionnek nincs saját this kulcsszva, tehát az arrow fucntion-ön belül a this
    // ugyanazt fogja jelenteni mint azon kívül (a class-t amiben vagyunk)
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      event.preventDefault();
      // console.log(event);
      const searchTerm = document.querySelector('#dogSearchInput').value;
      // mivel a getImages egy async method, ezért ez is promise-al tér vissza
      // emiatt, a promise object-en amit a getImages visszaad, elérhető a .then() metódus
      // a then metódus bementi paramétere egy callback funciton, ami akkor fut le amikor
      // a promise beteljesül (akkor jön létre a data amit visszaad a getImages metódus)
      // ha az arrow funciton-ben csak egy bemeneti paraméter van, akkor a zárójel elhagyható

      super.handleContentDisplay(searchTerm);


    });

  }
}

export default SearchImage;

