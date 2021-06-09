import '../css/contentComponent.css';
import yall from 'yall-js';
import preloading from '../img/preloading.gif';


// az export default ide is beírható, akkor a file végére már nem kell..
export default class ContentComponent {

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
    image.src = '../img/preloading.gif';
    image.dataset.src = data.message[Math.floor(Math.random() * data.message.length)];
    image.classList.add('lazy');
    document.querySelector('#content').appendChild(image);
    yall({
      events: {
        load: event => {
          if (event.target.nodeName == "IMG" && !event.target.classList.contains("lazy")) {
            event.target.classList.add("yall-loaded");
          }
        }
      }
    });

  }

  setSearchTerm(term) {
    document.querySelector('#dogSearchInput').value = term;
  }

  handleContentDisplay(searchTerm) {
    let DOMcount = document.querySelector('#imageNumberInput');
    let count;
    // console.log(searchTerm);

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

    this.setSearchTerm(searchTerm);

    this.clearContent();
    for (let i = 0; i < count; i++) {
      this.getImages(searchTerm).then(result => {
        // ha csak egy dolgot kell csinálni az if block-ban, akkor a kódblokk {} elhagyható
        if (result) this.displayImage(result);
      });

    }
  }

  // ha van már kép megjelenítve akkor azt töröljük
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }

  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  // megjelenít egy hibaüzenetet a felhasználónak
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.innerHTML = message;
    // <h2 class="error-message"> message </h2>
    document.querySelector('.errors').appendChild(popupMessage);
  }

}
