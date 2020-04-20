import React, { useState, useEffect } from "react"
import StripeCheckout from "react-stripe-checkout"
import PropTypes from "prop-types"
import { Button, Segment, Divider } from "semantic-ui-react"
import calculateCartTotal from "../../utils/calculateCartTotal"

function CartSummary({ products, handleCheckout, success }) {
  const [isCartEmpty, setCartEmpty] = useState(false)
  const [cartAmount, setCartAmount] = useState(0)
  const [stripeAmount, setStripeAmount] = useState(0)

  useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products)
    setCartEmpty(products.length === 0)
    setCartAmount(cartTotal)
    setStripeAmount(stripeTotal)
  }, [products])

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total: </strong>${cartAmount}
        <StripeCheckout
          name="React Reserve"
          amount={stripeAmount}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          token={handleCheckout}
          triggerEvent="onClick"
          stripeKey='pk_test_hq6GVJPFSgdxTyArWtHF2myf004kclsglj'
        >
          <Button
            icon="cart"
            color="teal"
            floated="right"
            content="Checkout"
            disabled={isCartEmpty || success}
          />
        </StripeCheckout>
      </Segment>
    </>
  )
}

CartSummary.propTypes = {
  products: PropTypes.array,
}

export default CartSummary
