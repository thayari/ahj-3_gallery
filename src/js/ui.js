import Image from './image';

export default class Ui {
  constructor() {
    this.form = document.querySelector('.form-container');
    this.imagesContainer = document.querySelector('.images-container');
    this.images = new Set();
  }

  start() {
    if (localStorage.gallery) {
      this.load();
      this.images.forEach((item) => {
        this.addImgHtml(item.url, item.title);
      });
    }
    this.formSubmit();
    this.deleteImage();
  }

  static textWidthByImg(item) {
    const title = item.querySelector('.title');
    const imgWidth = item.querySelector('img').offsetWidth;
    title.style.width = `${imgWidth}px`;
  }

  formSubmit() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const url = document.getElementById('link').value;
      const newImage = new Image(url, title);
      this.images.add(newImage);
      this.addImgHtml(newImage.url, newImage.title);
      document.getElementById('title').value = '';
      document.getElementById('link').value = '';
      this.save();
    });
  }

  addImgHtml(url, title) {
    const newImageElement = document.createElement('div');
    newImageElement.classList.add('image');
    newImageElement.innerHTML = `<div class="close"></div>
      <a href="${url}"><img src="${url}" alt="${title}"></a>
      <div class="title">${title}</div>`;
    this.imagesContainer.appendChild(newImageElement);
    Ui.textWidthByImg(newImageElement);
  }

  deleteImage() {
    this.imagesContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('close')) {
        const currentImage = event.target.parentNode;
        const src = currentImage.querySelector('img').getAttribute('src');
        this.images.forEach((item) => {
          if (src === item.url) {
            this.images.delete(item);
          }
        });
        this.imagesContainer.removeChild(currentImage);
        this.save();
      }
    });
  }

  save() {
    localStorage.gallery = JSON.stringify(Array.from(this.images));
  }

  load() {
    this.images = new Set(JSON.parse(localStorage.gallery));
  }
}
