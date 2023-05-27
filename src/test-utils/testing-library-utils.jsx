import { render } from "@testing-library/react";
import React from "react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

export const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everyting
export * from "@testing-library/react";

//override render method

export { renderWithContext as render };
