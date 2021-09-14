class Rating extends HTMLElement {
  constructor() {
    super();
    this.rating = 0;
    this.maxRating = 5;
  }

  connectedCallback() {
    this.rating = this.getAttribute("rating");
    this.render();
  }

  render() {
    const stars = Array.from({ length: this.maxRating })
      .map((item, index) => {
        return `<span class="fa fa-star star ${
          index < this.rating ? "star-checked" : ""
        }" id=${index}></span>`;
      })
      .join(" ");
    this.innerHTML = `
      <div>
        ${stars}
      </div>
    `;
  }
}

window.customElements.define("rating-c", Rating);
