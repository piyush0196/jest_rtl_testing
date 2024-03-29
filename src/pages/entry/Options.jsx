import React, { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { AlertBanner } from "../common/AlertBanner";
import { Row } from "react-bootstrap";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export const Options = ({ optionType }) => {
  // optionType is 'scoops' or 'toppings'

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    // create an abortController to attach to network request.
    const controller = new AbortController();

    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((res) => setItems(res.data))
      .catch((err) => {
        if (err.name !== "CanceledError") setError(true)
      });

    // abort axios call on component unmount
    return () => {
      controller.abort();
    }

  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title} </h2>
      <p> {formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems} </Row>
    </>
  );
};
