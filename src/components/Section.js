export default class Section {
  constructor({items, renderer}, cardContainerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(cardContainerSelector);
  }

  renderer() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  };
}