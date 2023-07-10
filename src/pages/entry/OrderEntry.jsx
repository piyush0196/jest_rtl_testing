import React from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import { Options } from "./Options";

export const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails()

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button type="button" onClick={() => setOrderPhase('review')}>Order Sundae</Button>
    </div>
  );
};
