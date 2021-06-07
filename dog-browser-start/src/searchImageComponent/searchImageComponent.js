import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent';


class SearchImage extends ContentComponent {

  constructor() {
    super();
    // példányosításkor, megjelenítjük a keresőt automatikusan
    this.render();
  }


  // Ez a metódus letölti az adatot az API-ról
  async getImages(dogbreed) {

    if(!dogbreed) {
      this.displayError('Nem lett beírva semmi a keresőbe, nem tudunk keresni!');
      // megállítjuk a getImages függvény futását
      return;
    }

    let urlString = '';
    dogbreed = dogbreed.split(' ');
    // a dogbreed változó mostmár egy tömb!
    if(dogbreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[0]}/images`;
    } else if (dogbreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[1]}/${dogbreed[0]}/images`;
    }
    const response = await fetch(urlString);
    const data = await response.json();
    // a data változó egy objecteket tartalmazó tömb
    return data;
  }
 
  // ez a metódus megjelenít egy képet (véletlenszerűen)
  displayImage(data) {
    this.clearErrors();
    this.clearContent();
    const image = document.createElement('img');
    // a data.message tömbből egy véletlenszerű elemet kiválasztunk
    image.src = data.message[Math.floor(Math.random() * data.message.length)];
    document.querySelector('#content').appendChild(image);
    // console.log(data);
  }


  // megjeleníti a keresőt:
  render() {
    const markup = `
    <form class="dog-search">
      <span class="search-icon"></span>
      <input type="text" id="dogSearchInput">
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
      this.getImages(searchTerm).then( result => {
        // ha csak egy dolgot kell csinálni az if block-ban, akkor a kódblokk {} elhagyható
        if (result) this.displayImage(result);
      });
    });

  }
}

export default SearchImage;

