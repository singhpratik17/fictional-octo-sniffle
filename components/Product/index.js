import { queryWrapper } from "../../apiConfig/index";
import { GET_PRODUCT } from "../../apiConfig/queries";
import "../Rating/index";

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.product = {};
  }

  async connectedCallback() {
    const data = await queryWrapper(GET_PRODUCT, { productId: 1 });
    if (data) {
      this.product = data.product;
    }
    this.render();
  }

  render() {
    const stars = Array.from({ length: 10 }).map((item, index) => {
      return `<star-span id=${index} />`;
    });
    this.innerHTML = `
      <div class="d-flex flex-column align-center container">
        <div class="d-flex flex-column">
          <h1 class="heading bold">${this.product.name}</h1>
          <div class="d-flex justify-between rating-row align-center">
            <div class="d-flex justify-start align-center">
              <p class="heading">${this.product.rating}</p>  
              <rating-c class="star-container-header" rating="${this.product.rating}"></rating-c>
            </div>    
          </div>
          <hr />
        </div>
      </div>
    `;
  }
}

window.customElements.define("product-card", ProductCard);
