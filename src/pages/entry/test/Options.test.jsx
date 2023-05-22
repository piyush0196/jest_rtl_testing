import { findAllByAltText, render, screen } from "@testing-library/react";

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
