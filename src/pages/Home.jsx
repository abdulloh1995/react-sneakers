import React from 'react';
import Card from "../components/Card/Card";

const Home = ({
                  items, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite
              }) => {
    const clearInput = () => {
        setSearchValue('')
    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">
                    {searchValue && <img
                        className="clear"
                        onClick={clearInput}
                        src="/img/btn_remove.svg"
                        alt="Clear"
                    />}
                    <img src="/img/search.svg" alt="Search"/>
                    <input
                        onChange={onChangeSearchInput}
                        placeholder="Поиск..."
                        value={searchValue}
                    />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {/*start cards*/}
                {items.map((item) => (
                    <Card
                        key={item.id}
                        {...item}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                    />
                ))}
                {/*end cards*/}
            </div>
        </div>
    );
};

export default Home;