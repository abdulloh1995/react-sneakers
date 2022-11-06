import React, {useContext, useEffect, useState} from 'react';
import Card from "../components/Card/Card";
import axios from "axios";
import AppContext from "../context";

const Orders = () => {

    const {onAddToFavorite, onAddToCart} = useContext(AppContext)
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        async function fetchData() {
            try {
                const {data} = await axios.get('https://635acd496f97ae73a636cf93.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()

    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {/*start cards*/}
                {(isLoading
                    ? [...Array(8)]
                    : orders).map((item, index) => (
                    <Card
                        key={index}
                        {...item}
                        loading={isLoading}
                    />
                ))}
                {/*end cards*/}
            </div>
        </div>
    );
};

export default Orders;