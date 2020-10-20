export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._renderedItems.forEach(item => this.renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}