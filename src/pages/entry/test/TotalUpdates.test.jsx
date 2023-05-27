import { render, screen } from "../../../test-utils/testing-library-utils";
import UserEvent from "@testing-library/user-event";
import { Options } from "../Options";

test("update scoop subtotal when scoops change", async () => {
  const user = UserEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  //update vanilla scoop to 1, check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput); // Used in text fields to clear everything before writing
  await user.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  //update chocolate scoop to 2, check the subtotal
  const mintChipInput = await screen.findByRole("spinbutton", {
    name: "Mint chip",
  });
  await user.clear(mintChipInput);
  await user.type(mintChipInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});
