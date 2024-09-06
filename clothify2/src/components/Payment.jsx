import React, { useState, useEffect } from "react";
import "../styles/Payment.module.css";

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://imagedelivery.net/maTmUOtE_OG9P8IykvHTIA/191256ee-1920-40e8-b9c4-61b4a3bda700/public"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Puma T-shirt</h3>
      <h5>$24</h5>
      </div>
    </div>
    <form action="http://localhost:4242/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Payment() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}