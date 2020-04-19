import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Button, Segment, Divider } from "semantic-ui-react"
import calculateCartTotal from "../../utils/calculateCartTotal"

function CartSummary({ products }) {
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
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
          disabled={isCartEmpty}
        />
      </Segment>
    </>
  )
}

CartSummary.propTypes = {
  products: PropTypes.array,
}

export default CartSummary
