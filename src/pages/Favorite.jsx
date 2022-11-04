import React, {useContext} from 'react';
import Card from "../components/Card/Card";
import AppContext from "../context";

const Favorite = () => {

    const {favorites, onAddToFavorite} = useContext(AppContext)


    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {/*start cards*/}
                {favorites.map((item) => (
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