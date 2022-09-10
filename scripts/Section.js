import Card from './Card.js';
import { initialCards } from './constants.js';

export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  addItems() {
    this._items.forEach((item) =>{
      this._renderer(item, this._container);
    })
  }

  addItem(item) {
    this._renderer(item, this._container);
  }
}

// const cardList = new Section({items: initialCards, renderer: (item, container) => {
//   const card = new Card(item,'cards__card').generateCard();
//   container.append(card);
// }}, '.cards');