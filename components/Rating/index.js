class Rating extends HTMLElement {
  constructor() {
    super();
    this.rating = 0;
    this.maxRating = 5;
    this.mode = "";
  }

  connectedCallback() {
    this.rating = this.getAttribute("rating");
    this.mode = this.getAttribute("mode");
    this.render();
    if (this.mode === "editable") {
      const handleMouseOver = (event) => {
        addClasses(event.target.id);
      };
      const handleMouseOut = (event) => {
        addClasses(event.target.id);
      };
      const allStars = document.querySelectorAll(".editable-star");

      const addClasses = (index) => {
        allStars.forEach((item) => {
          if (parseInt(item.id) <= parseInt(index)) {
            item.classList.add("star-checked");
          } else {
            item.classList.remove("star-checked");
          }
        });
      };

      allStars.forEach((item) => {
        item.addEventListener("mouseenter", handleMouseOver);
        item.addEventListener("mouseleave", handleMouseOut);
        item.addEventListener("click", (event) => {
          addClasses(event.target.id);
          item.removeEventListener("mouseleave", handleMouseOut);
        });
      });
    }
  }

  render() {
    const stars = Array.from({ length: this.maxRating })
      .map((item, index) => {
        return `<span class="fa fa-star star ${
          index < this.rating ? "star-checked" : ""
        }${
          this.mode === "editable" ? "editable-star" : ""
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
