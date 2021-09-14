import "../Rating/index";
import "../Button/index";

class AddReview extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();
    this.close = this.close.bind(this);
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
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
    this.querySelector(".wrapper").setAttribute("aria-hidden", !isOpen);
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
            <rating-c class="pointer" mode="editable"></rating-c>
            <p class="f-24 mt-40">Review</p>
            <textarea
            placeholder="Start typing..."
            rows="2" 
            maxlength="180"
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
