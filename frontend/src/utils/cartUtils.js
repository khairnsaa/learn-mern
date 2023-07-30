export const updateCart = (state) => {
  // calculate item price
  state.itemPrice = state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0);
  // calculate shipping price
  // get free shipping if buy more than $100
  state.shippingPrice = state.shippingPrice > 100 ? 0 : 10;
  // calculate tax price
  state.taxPrice = Number((0.1 * state.itemPrice).toFixed(2));

  // calculate total price
  state.totalPrice = (
    Number(state.itemPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // saving the data to local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
