import React, {useContext} from 'react';
import Card from "../components/Card/Card";
import AppContext from "../context";

const Favorite = ({onAddToFavorite}) => {

    const state = useContext(AppContext)

    console.log( state)

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {/*start cards*/}
                {[].map((item) => (
                    <Card
                        key={item.id}
                        favorited={true}
                        {...item}
                        onFavorite={onAddToFavorite}
                    />
                ))}
                {/*end cards*/}
            </div>
        </div>
    );
};

export default Favorite;