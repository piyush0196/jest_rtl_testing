import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useOrderDetails } from '../../contexts/OrderDetails'

export const OrderConfirmation = ({ setOrderPhase }) => {
    const [orderNumber, setOrderNumber] = useState(null)
    const { resetOrder } = useOrderDetails();

    const handleClick = () => {
        // clear the order details
        resetOrder();

        // send back to orders page
        setOrderPhase('inProgress')
    }


    useEffect(() => {
        axios.post('http://localhost:3030/order')
            .then((res) => {
                setOrderNumber(res.data?.orderNumber)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        orderNumber ?
            <div style={{ textAlign: "center" }}>
                <h1>Thank You!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{ fontSize: "25%" }}>
                    as per our terms and conditions, nothing will happen now
                </p>
                <Button onClick={handleClick}>Create new order</Button>
            </div>
            :
            <div>Loading...</div>

    )
}
