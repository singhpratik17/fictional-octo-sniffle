const GET_PRODUCT = `query ExampleQuery($productId: Int!) {
  product(id: $productId) {
    id
    name
    rating
    reviews {
      comment
      rating
    }
  }
}`;

export { GET_PRODUCT };
