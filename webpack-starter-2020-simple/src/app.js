import html from './index.html';
import './style.css';
import './style.scss';

async function getImage() {
  console.log('hello');
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await response.json();
  console.log(data.message);

}

getImage();
