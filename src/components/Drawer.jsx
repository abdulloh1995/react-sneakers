import React from 'react';

const Drawer = ({onClose, items = [], onDeleteInCart}) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src="/img/btn_remove.svg" alt="Close"/>
                </h2>

                <div className="items">
                    {items.map(item => (
                        <div className="cartItem d-flex align-center mb-20">
                            <div style={{backgroundImage: `url(${item.imgUrl})`}} className="cartItemImg">

                            </div>
                            <div className="mr-20 flex">
                                <p className="mb-5">{item.name}</p>
                                <b>{item.price}</b>
                            </div>
                            <img onClick={() => onDeleteInCart(item.id)} className="removeBtn" src="/img/btn_remove.svg" alt="Remove"/>
                        </div>
                    ))}
                </div>

                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого: </span>
                            <div></div>
                            <b>21 498 руб. </b>
                        </li>
                        <li>
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>1074 руб. </b>
                        </li>
                    </ul>
                    <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>

                </div>

            </div>
        </div>
    );
};

export default Drawer;