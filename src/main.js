import {getMovies} from './api';
import ParallaxObject from './parallaxObject';

document.addEventListener("DOMContentLoaded", () => {
  const listRoot = document.getElementById("container").querySelector(".list");
  getMovies('https://api.zype.com/videos/?api_key=H7CF2IHbEc6QIrMVwb2zfd9VI14HHGAfYax1eHEUsJ4voYuqWF2oWvByUOhERva_').then(data => {
    loadContent(listRoot, data);
    console.log(data);
  }).catch(err => {
    console.error('Error:', err.statusText);
  });
});

function loadContent(listRoot, data) {
  // create a new parallaxObject for each data item
  let parallaxObjects = [];
  data.slice(1).forEach(datum => {
    const parallaxObject = new ParallaxObject({listRoot: listRoot, data: datum});
    parallaxObjects.push(parallaxObject);
    listRoot.appendChild(parallaxObject.listItem);
  });

  listRoot.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      // only call this function when the window is ready to render; improves speed
      parallaxObjects.forEach(obj => {
        let rect = obj.listItem.getBoundingClientRect();
        obj.animate(rect);
      });
    });
  });

}
