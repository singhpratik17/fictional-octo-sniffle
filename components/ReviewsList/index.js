export class ReviewsList extends HTMLElement {
  constructor() {
    super();
    this.reviews = [];
  }

  set reviewsList(reviews) {
    this.reviews = reviews;
  }

  render() {
    const reviewList = this.reviews
      .map((item) => {
        return `<div class="d-flex align-center review-item">
              <rating-c class="" rating="${item.rating}"></rating-c>
              <div>
                <p class="review-comment">
                 <span class="text-primary bold rating-val">${item.rating},</span>${item.comment}
                </p>
              </div>
        </div>`;
      })
      .join(" ");
    return `
      <div class="d-flex flex-column">
        ${reviewList}
      </div>
    `;
  }
}

window.customElements.define("review-list", ReviewsList);
