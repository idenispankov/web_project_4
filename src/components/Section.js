export default class Section {
  constructor({data, renderer}, cardContainerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = cardContainerSelector;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}