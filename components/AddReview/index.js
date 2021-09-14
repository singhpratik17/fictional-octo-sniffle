import "../Rating/index";
import "../Button/index";
import { queryWrapper } from "../../apiConfig";
import { CREATE_REVIEW } from "../../apiConfig/mutation";

class AddReview extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();
    this.close = this.close.bind(this);
  }

  close() {
    if (this.open !== false) {
      this.open = false;
    }
  }

  disconnectedCallback() {
    this.querySelector(".overlay").removeEventListener("click", this.close);
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(isOpen) {
    this.querySelector(".wrapper").classList.toggle("open", isOpen);
    if (isOpen) {
      this._wasFocused = document.activeElement;
      this.setAttribute("open", "");
      this.focus();
    } else {
      this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
      this.removeAttribute("open");
      this.close();
    }
  }

  connectedCallback() {
    this.render();

    const button = document.getElementById("submit-review-button");
    button.addEventListener("click", async () => {
      const allStars = document.querySelectorAll(
        "#rating-element .star-checked"
      );
      const comment = document.getElementById("review-comment-input").value;
      let productId = this.getAttribute("productId");
      productId = parseInt(productId);
      console.warn(productId);
      await queryWrapper(CREATE_REVIEW, {
        comment,
        rating: allStars.length,
        productId,
      });
      this.close();
      window.location.reload();
    });
  }

  render() {
    this.innerHTML = `
    <style>
    </style>
    <div class="wrapper">
    <div class="overlay"></div>
      <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
          <div class="d-flex flex-column">
            <h1 class="heading">What’s your rating?</h1>
            <p class="f-24 mt-40">Rating</p>
            <rating-c id="rating-element" class="pointer" mode="editable"></rating-c>
            <p class="f-24 mt-40">Review</p>
            <textarea
            placeholder="Start typing..."
            rows="2" 
            maxlength="120"
            class="review-input"
            id="review-comment-input"></textarea>
            <button-c label="Submit review" id="submit-review-button" class="mt-40"></button-c>  
          </div>
      </div>
    </div>`;

    this.querySelector(".overlay").addEventListener("click", this.close);
    this.open = this.open;
  }
}

customElements.define("add-review", AddReview);
