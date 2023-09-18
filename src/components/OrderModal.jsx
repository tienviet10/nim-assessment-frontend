import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles/OrderModal.module.css";
import url from "../domain";

function OrderModal({ order, setOrderModal }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  const formatPhoneNumber = (inputPhoneNumber) => {
    const cleanedPhoneNumber = inputPhoneNumber.replace(/\D/g, "");

    const formattedPhoneNumber = `(${cleanedPhoneNumber.slice(
      0,
      3
    )}) ${cleanedPhoneNumber.slice(3, 6)}-${cleanedPhoneNumber.slice(6, 10)}`;

    return formattedPhoneNumber;
  };

  const placeOrder = async () => {
    setNameError("");
    setPhoneError("");
    setAddressError("");
    let isValid = true;

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }

    const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phone || !phonePattern.test(phone)) {
      setPhoneError("Invalid phone number format. Use (XXX) XXX-XXXX.");
      isValid = false;
    }

    if (!address) {
      setAddressError("Address is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const response = await fetch(`${url}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone: formatPhoneNumber(phone),
        address,
        items: order
      })
    });

    if (response.ok) {
      const data = await response.json();
      navigate(`/order-confirmation/${data.id}`);
    }
  };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
          {nameError && <p className={styles.error}>{nameError}</p>}
          {phoneError && <p className={styles.error}>{phoneError}</p>}
          {addressError && <p className={styles.error}>{addressError}</p>}
        </form>
        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
