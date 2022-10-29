import Card from "./components/Card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import favorite from "./pages/Favorite";

function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios.get('https://635acd496f97ae73a636cf93.mockapi.io/snakers')
            .then(res => {
                setItems(res.data)
            })
        axios.get('https://635acd496f97ae73a636cf93.mockapi.io/cart')
            .then(res => {
                setCartItems(res.data)
            })
        axios.get('https://635acd496f97ae73a636cf93.mockapi.io/favorites')
            .then(res => {
                setFavorites(res.data)
            })
        // setItems(items)
    }, []);

    const onAddToCart = async (obj) => {
        await axios.post('https://635acd496f97ae73a636cf93.mockapi.io/cart', obj)
        setCartItems(prevState => [...prevState, obj])
    }

    const onAddToFavorite = async (obj) => {
       try {
           if (favorites.find((item) => item.id === obj.id)) {
               await axios.delete(`https://635acd496f97ae73a636cf93.mockapi.io/favorites/${obj.id}`)
           } else {
               const {data} = await axios.post('https://635acd496f97ae73a636cf93.mockapi.io/favorites', obj)
               setFavorites(prevState => [...prevState, data])
           }
       } catch (err) {
           console.log(err)
       }
    }

    const onDeleteInCart = (id) => {
        console.log(id)
        axios.delete(`https://635acd496f97ae73a636cf93.mockapi.io/cart/${id}`)
        setCartItems(cartItems.filter(o => o.id !== id))
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }


    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer
                items={cartItems}
                onClose={() => setCartOpened(false)}
                onDeleteInCart={onDeleteInCart}
            />
            }
            <Header onClickCart={() => setCartOpened(true)}/>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToCart={onAddToCart}
                            onAddToFavorite={onAddToFavorite}

                        />}
                />
                <Route
                    path="/favorites"
                    element={<Favorite
                        items={favorites}
                        onAddToFavorite={onAddToFavorite}
                    />}
                    exact
                />
            </Routes>


        </div>
    );
}

export default App;
