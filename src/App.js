import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { OrderSummary } from "./pages/summary/OrderSummary";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and  entry page needs provider */}
        <OrderEntry />
        <OrderSummary />
      </OrderDetailsProvider>
      {/* Confirmation Page does not needs provider */}
    </Container>
  );
}

export default App;
