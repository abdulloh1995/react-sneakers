import React, {useState} from 'react';
import classes from "./Card.module.scss";

const Card = ({id, name, imgUrl, price, onPlus, onFavorite}) => {

    const [isAdded, setIsAdded] = useState(false);

    const handleCheck = () => {
        onPlus({id, name, imgUrl, price})
        setIsAdded(! isAdded)
    }



    return (
        <div className={classes.card}>
            <div className={classes.favorite} onClick={onFavorite}>
                <img src="/img/heart_unliked.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imgUrl} alt=""/>
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <span>
                    <img className={classes.plus} onClick={handleCheck} src={!isAdded ? '/img/btn_plus.svg' : '/img/btn-checked.svg'} alt="plus"/>
                </span>
            </div>
        </div>
    );
};

export default Card;