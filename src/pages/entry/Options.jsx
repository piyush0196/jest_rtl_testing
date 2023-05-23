import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScoopOption } from "./ScoopOption";
import { ToppingOption } from "./ToppingOption";
import { AlertBanner } from "../common/AlertBanner";

export const Options = ({ optionType }) => {
  // optionType is 'scoops' or 'toppings'

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((err) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <div>{optionItems} </div>;
};
