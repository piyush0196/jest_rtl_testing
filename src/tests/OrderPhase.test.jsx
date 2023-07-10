import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';


test('Order phases for Happy Path', async () => {
    const user = userEvent.setup()

    // render the app
    // don't need to wrap provider; already wrapped

    //destructure unmount to use it at the end of the test
    const { unmount } = render(<App />)

    // add ice cream scoops and toppings

    //scoop
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    // topping
    const hotFudgeInput = await screen.findByRole('checkbox', { name: 'Hot fudge' })
    await user.click(hotFudgeInput);

    // find and click order summary button
    const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i })
    await user.click(orderSummaryButton);

    // check summary information based on order 
    const summaryHeading = screen.getByRole('heading', { name: /Order Summary/i })
    expect(summaryHeading).toBeInTheDocument();

    const scoopHeading = screen.getByRole('heading', { name: 'Scoops: $2.00' })
    expect(scoopHeading).toBeInTheDocument();

    const toppingHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' })
    expect(toppingHeading).toBeInTheDocument();

    // check summary option items
    expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
    expect(screen.getByText("Hot fudge")).toBeInTheDocument();


    // // alternatively...
    // // const optionItems = screen.getAllByRole('listitem');
    // // const optionItemsText = optionItems.map((item) => item.textContent);
    // // expect(optionItemsText).toEqual(['1 Vanilla', '1 Hot fudge']);


    // accept t&c and click button to confirm order
    const tncInput = screen.getByRole('checkbox', { name: /terms and conditions/i })
    await user.click(tncInput);

    const confirmOrderButton = screen.getByRole('button', { name: /Confirm order/i })
    await user.click(confirmOrderButton);

    // expect Loading... to show
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    // Check confirmation page text
    // this is async because there is a POST request from server in between summary and confirmation Page
    const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i })
    expect(thankYouHeader).toBeInTheDocument();

    // Loading should disappear
    const notLoading = screen.queryByText(/loading/i);
    expect(notLoading).not.toBeInTheDocument();

    // confirm order number on confirmation page
    const orderNumberHeading = await screen.findByText(/Order number/i)
    expect(orderNumberHeading).toBeInTheDocument()

    // Click "new order" button on confirmation page
    const newOrderButton = screen.getByRole('button', { name: /new order/i });
    await user.click(newOrderButton);

    // check that scoops and toppings subtotal have been reset
    const scoopTotal = await screen.findByText("Scoops total: $0.00")
    expect(scoopTotal).toHaveTextContent('0.00')
    const toppingTotal = await screen.findByText("Toppings total: $0.00")
    expect(toppingTotal).toHaveTextContent('0.00')

    // unmount the component to trigger cleanup and avoid
    // "not wrapped in act()" error
    unmount();
})
