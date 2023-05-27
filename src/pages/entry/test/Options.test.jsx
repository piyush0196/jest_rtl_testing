import { render, screen } from "../../../test-utils/testing-library-utils";

import { Options } from "../Options";

test("displays image of each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm altText of the images
  const altText = scoopImages.map((image) => image.alt);
  expect(altText).toEqual(["Mint chip scoop", "Vanilla scoop"]);
});

test("displays image of each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toppingImage = await screen.findAllByRole("img", { name: /topping/i });
  expect(toppingImage).toHaveLength(3);

  //confirm altText of images
  const altText = toppingImage.map((image) => image.alt);
  expect(altText).toEqual([
    "M&Ms topping",
    "Hot fudge topping",
    "Peanut butter cups topping",
  ]);
});
