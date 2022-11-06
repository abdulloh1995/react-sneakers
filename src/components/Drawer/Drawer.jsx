import React, {useState} from 'react';
import Info from "../Info";
import axios from "axios";
import {useCart} from "../../hooks/useCart";
import classes from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({onClose, items = [], onDeleteInCart, opened}) => {
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [isCompleted, setIsCompleted] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://635acd496f97ae73a636cf93.mockapi.io/orders', {
                items: cartItems
            })
            setOrderId(data.id)
            setIsCompleted(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete('https://635acd496f97ae73a636cf93.mockapi.io/cart/'+item.id)
                await delay(1000)
            }
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    return (
        <div className={`${classes.overlay} ${opened ? classes.overlayVisible : ''} `}>
            <div className={classes.drawer}>
                <h2 className="mb-30 d-flex justify-between">Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src="/img/btn_remove.svg" alt="Close"/>
                </h2>
                {
                    items.length > 0
                        ?
                        (<div className="d-flex flex-column flex">
                            <div className="items flex">
                                {items.map(item => (
                                    <div key={item.id} className="cartItem d-flex align-center mb-20">
                                        <div style={{backgroundImage: `url(${item.imgUrl})`}} className="cartItemImg">

                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{item.name}</p>
                                            <b>{item.price}</b>
                                        </div>
                                        <img onClick={() => onDeleteInCart(item.id)} className="removeBtn"
                                             src="/img/btn_remove.svg" alt="Remove"/>
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Итого: </span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{Math.ceil(totalPrice / 100 * 5)} руб. </b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить
                                    заказ <img
                                        src="/img/arrow.svg" alt="Arrow"/>
                                </button>

                            </div>
                        </div>)
                        :
                        (
                            <Info
                                title={isCompleted ? "Заказ оформлен!" : "Корзина пустая"}
                                description={isCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                                image={isCompleted ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                            />
                        )
                }
            </div>
        </div>
    );
};

export default Drawer;