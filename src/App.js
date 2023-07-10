import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { OrderSummary } from "./pages/summary/OrderSummary";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";
import { useState } from "react";


function App() {
  const [orderPhase, setOrderPhase] = useState('entry')

  let Component = OrderEntry //default to order page 
    
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;

    case 'review':  
      Component = OrderSummary; 
      break;

    case 'completed':
      Component = OrderConfirmation;  
      break;

    default:
      break;
  }
            

  return (
      <OrderDetailsProvider>
        <Container>
            <Component setOrderPhase={setOrderPhase} />            
        </Container>
      </OrderDetailsProvider>
  );
}

export default App;
