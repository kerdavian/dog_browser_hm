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

    //eltávolítom a fölösleges szóközöket
    dogbreed = dogbreed.replace(/\s\s+/g, ' ');
    dogbreed = dogbreed.trim();
    // console.log(dogbreed);

    if (!dogbreed) {
      this.displayError('Nem lett beírva semmi a keresőbe, nem tudunk keresni!');
      // megállítjuk a getImages függvény futását
      return;
    }

    let urlString = '';
    dogbreed = dogbreed.split(' ');
    // a dogbreed változó mostmár egy tömb!

    //mivel a tömb első elemét mindig kisbetűssé kell tenni, ezért érdemesebb itt megtenni. Így kevesebbszer kell leírni
    dogbreed[0] = dogbreed[0].toLowerCase();


    if (dogbreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[0]}/images`;
    } else if (dogbreed.length === 2) {
      dogbreed[1] = dogbreed[1].toLowerCase();
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

      let DOMcount = document.querySelector('#imageNumberInput');
      let count;

      // miért csináltam így?
      // Az gond, hogy ha az input field értékét először parseInt-elem, akkor az olyan értékekre, mint a "3r" vagy "5zt" 3 ill. 5 lesz a visszatérési érték. Sztem ez így nem megfelelő. Ezért inkább első körben, megnézem, hogy a bevitt érték szám-e. Ilyenkor "3r" és az "5zt",helyesen NaN értéket fog visszadani. Azonban ekkor pedig az probléma, hogy úgy tűnik az isNaN() nem tudja lekezelni az üres input-ot. Szerinte az üres string nem NaN. Ezért miután levizsgáltuk, hogy az input szám-e, a parseInt függvénnyel még mindig átkell alakítanunk, ugyanis a mező lehet üres is. Érdekes, hogy ha nem alakítjuk számmá az üres mezőt akkor egy üres string jön vissza, ami szintén nem NaN. Átalakítás után, azonban az üres mező NaN lesz. Így ezután újra kell egy isNaN vizsgálat, majd ezután csak a nullánál nagyobb értékeket vesszük figyelembe! Itt persze lehet másféle  konvenció is.

      if (isNaN(DOMcount.value)) {
        count = 1;
      } else {
        count = Math.floor(parseInt(DOMcount.value));
        if (isNaN(count)) { // ez azért kell, mert, ha 
          count = 1;
        } else if (count < 1) {
          count = 1;
        }
      }
      // console.log(count);

      this.clearContent();
      for (let i = 0; i < count; i++) {
        this.getImages(searchTerm).then(result => {
          // ha csak egy dolgot kell csinálni az if block-ban, akkor a kódblokk {} elhagyható
          if (result) this.displayImage(result);
        });

      }


    });

  }
}

export default SearchImage;

