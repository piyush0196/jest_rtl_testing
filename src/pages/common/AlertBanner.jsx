import React from "react";
import Alert from "react-bootstrap/Alert";

export const AlertBanner = ({ message, variant }) => {
  const alertMessage =
    message || "An unexpected error ocurred. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};
