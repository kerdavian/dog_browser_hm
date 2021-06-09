import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent';

let storedDogs;

class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
    if (localStorage.length > 0) {
      storedDogs = JSON.parse(localStorage.getItem('dogs'));
    }

  }

  async getFullList() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (response.status === 404) {
      this.displayError('Page not found!');
      return;
    }
    const data = await response.json();
    // console.log(data);
    this.dataStore(data);

    return data;

  }

  dataStore(data) {
    localStorage.setItem('dogs', JSON.stringify(data));
    storedDogs = JSON.parse(localStorage.getItem('dogs'));
  }

  createListItem(title) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.innerHTML = title;
    item.addEventListener('click', () => {
      this.handleContentDisplay(title);
    });
    document.querySelector('#content').appendChild(item);
  }

  displayList(results) {
    // a result.message egy object, amin végig megyünk key:value páronként..

    for (const breed in results.message) {
      // ha a value (ami egy tömb) hossza nem nulla
      if (results.message[breed].length !== 0) {
        // akkor végmegyünk a tömbön, és kiírjuk a fajtákat, alfajjal együtt,
        for (const subBreed of results.message[breed]) {
          // minden alfaj mögé odaírjuk a főfaj nevét... pl: 
          // boston bulldog, french bulldog, stb...
          this.createListItem(subBreed + ' ' + breed);
        }
      } else {
        // ha nincs alfaj (a tömb hossza nulla)
        // akkor csak a főfajt jelenítjük meg
        this.createListItem(breed);
      }
    }
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.innerHTML = 'List Breeds';
    if (localStorage.length > 0) {

    }

    // button html elemenek van onclick attribútuma...
    button.onclick = () => {
      this.clearContent();
      if (localStorage.length > 0) {
        this.displayList(storedDogs);
      } else {
        //                                           👇🏻short circuit evaluation
        this.getFullList().then(results => { results && this.displayList(results); });
      }
    };
    document.querySelector('#header').appendChild(button);
  }
}

export default ListBreeds;
