import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent';



class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
  }



  async getFullList() {
    if (localStorage.length === 0) {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (response.status === 404) {
        this.displayError('Page not found!');
        return;
      }
      const data = await response.json();
      console.log(data);

      let key;
      let value;
      for (const breed in data.message) {

        // ha a value (ami egy tömb) hossza nem nulla
        if (data.message[breed].length !== 0) {
          // akkor végmegyünk a tömbön, és kiírjuk a fajtákat, alfajjal együtt,
          for (const subBreed of data.message[breed]) {
            // minden alfaj mögé odaírjuk a főfaj nevét... pl: 
            // boston bulldog, french bulldog, stb...
            key = subBreed;
            value = breed;
            localStorage.setItem(key, value);
          }
        } else {
          // ha nincs alfaj (a tömb hossza nulla)
          // akkor csak a főfajt jelenítjük meg
          key = breed;
          value = "";
          localStorage.setItem(key, value);
        }
      }



      return data;
    }
  }


  createListItem(title) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.innerHTML = title;
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

  displayListFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      this.createListItem(key + ' ' + value);
    }
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.innerHTML = 'List Breeds';

    // button html elemenek van onclick attribútuma...
    button.onclick = () => {
      this.clearContent();
      if (localStorage.length !== 0) {
        this.displayListFromLocalStorage();
      } else {
        //                                           👇🏻short circuit evaluation
        this.getFullList().then(results => { results && this.displayList(results); });
      }
    };
    document.querySelector('#header').appendChild(button);
  }
}

export default ListBreeds;
