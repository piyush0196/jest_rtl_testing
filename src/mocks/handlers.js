import { rest } from "msw";



export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Mint chip",
          imagePath: "/images/mint-chip.png",
        },
        {
          name: "Vanilla",
          imagePath: "/images/vanilla.png",
        },
      ])
    );
  }),

  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "M&Ms",
          imagePath: "/images/m-and-ms.png",
        },
        {
          name: "Hot fudge",
          imagePath: "/images/hot-fudge.png",
        },
        {
          name: "Peanut butter cups",
          imagePath: "/images/peanut-butter-cups.png",
        },
      ])
    );
  }),
  rest.get("http://localhost:3030/order", async (req, res, ctx) => {
    await sleep(100)
    return res(
      ctx.json({orderNumber: 1234587454})
    );
  })
];
