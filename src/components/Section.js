export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  addItems() {
    this._items.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

  addItem(item) {
    this._renderer(item, this._container);
  }
}
