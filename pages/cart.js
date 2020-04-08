import { Segment, Card } from "semantic-ui-react";
import CartSummary from "../components/Cart/CartSummary";
import CartItemList from "../components/Cart/CartItemList";

function Cart() {
  return (
    <Segment>
      <CartItemList />
      <CartSummary />
    </Segment>
  );
}

export default Cart;
