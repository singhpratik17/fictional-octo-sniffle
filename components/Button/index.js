class Button extends HTMLElement {
  constructor() {
    super();
    this.label = "Add review";
  }

  async connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="btn">
        ${this.label}
      </div>
    `;
  }
}

window.customElements.define("button-c", Button);