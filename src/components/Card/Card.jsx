import React, {useContext, useState} from 'react';
import classes from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

const Card = ({id, name, imgUrl, price, onPlus, onFavorite, favorited = false, loading = false}) => {

    const [isFavorite, setIsFavorite] = useState(favorited);
    const {isItemAdded} = useContext(AppContext)


    const handleCheck = () => {
        onPlus({id, name, imgUrl, price})
    }

    const handleLike = () => {
        onFavorite({id, name, imgUrl, price})
        setIsFavorite(!isFavorite)
    }


    return (
        <div className={classes.card}>
            {
                loading ? <ContentLoader
                        speed={2}
                        width={150}
                        height={200}
                        viewBox="0 0 150 200"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <circle cx="576" cy="235" r="20"/>
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="90"/>
                        <rect x="0" y="105" rx="3" ry="3" width="150" height="15"/>
                        <rect x="0" y="125" rx="3" ry="3" width="100" height="15"/>
                        <rect x="0" y="164" rx="3" ry="3" width="80" height="25"/>
                        <rect x="118" y="164" rx="10" ry="10" width="32" height="32"/>
                    </ContentLoader> :
                    <>
                        <div className={classes.favorite} onClick={onFavorite}>
                            <img onClick={handleLike}
                                 src={!isFavorite ? '/img/heart_unliked.svg' : '/img/heart_liked.svg'} alt="Unliked"/>
                        </div>
                        <img width={133} height={112} src={imgUrl} alt=""/>
                        <h5>{name}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            <span>
                <img className={classes.plus} onClick={handleCheck}
                     src={isItemAdded(id) ?  '/img/btn-checked.svg' : '/img/btn_plus.svg' } alt="plus"/>
                </span>
                        </div>
                    </>
            }

        </div>
    );
};

export default Card;