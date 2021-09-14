import { queryWrapper } from "../../apiConfig/index";
import { GET_PRODUCT } from "../../apiConfig/queries";
import "../Rating/index";
import "../Button/index";
import "../ReviewsList/index";
import { ReviewsList } from "../ReviewsList";

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.product = {
      reviews: [],
    };
    this.reviewComp = "";
  }

  async connectedCallback() {
    const data = await queryWrapper(GET_PRODUCT, { productId: 1 });
    if (data) {
      this.product = data.product;
      if (this.product.reviews.length) {
        const ReviewList = new ReviewsList();
        ReviewList.reviewsList = this.product.reviews;
        this.reviewComp = ReviewList.render();
      }
    }
    this.render();

    const button = document.getElementById("add-review-button");
    button.addEventListener("click", () => {
      document.querySelector("add-review").open = true;
    });
  }

  render() {
    this.innerHTML = `
      <div class="d-flex flex-column align-center container">
        <div class="d-flex flex-column">
          <h1 class="heading bold">${this.product.name}</h1>
          <div class="d-flex justify-between rating-row align-center">
            <div class="d-flex justify-start align-center">
              <p class="heading">${this.product.rating}</p>  
              <rating-c class="star-container-header" rating="${this.product.rating}"></rating-c>
            </div>    
            <button-c label="Add review" id="add-review-button"></button-c>  
          </div>
          <hr />
        </div>
        <div class="d-flex flex-column">
          <h1 class="heading sub-heading bold">Reviews</h1>
          ${this.reviewComp}
        </div>
      </div>
    `;
  }
}

window.customElements.define("product-card", ProductCard);
