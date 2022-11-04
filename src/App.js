
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import AppContext from "./context";



function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            const cartRes = await axios.get('https://635acd496f97ae73a636cf93.mockapi.io/cart')
            const favoriteRes = await axios.get('https://635acd496f97ae73a636cf93.mockapi.io/favorites')
            const itemsRes = await axios.get('https://635acd496f97ae73a636cf93.mockapi.io/snakers')
            setIsLoading(false)

            setCartItems(cartRes.data)
            setFavorites(favoriteRes.data)
            setItems(itemsRes.data)
        }

        fetchData()
    }, []);

    const onAddToCart = async (obj) => {
        console.log(obj)
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                await axios.delete(`https://635acd496f97ae73a636cf93.mockapi.io/cart/${obj.id}`)
                setCartItems(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                await axios.post('https://635acd496f97ae73a636cf93.mockapi.io/cart', obj)
                setCartItems(prevState => [...prevState, obj])
            }

        } catch (err) {
            console.log(err)
        }
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
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

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }


    return (
        <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
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
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToCart={onAddToCart}
                                onAddToFavorite={onAddToFavorite}
                                isLoading={isLoading}

                            />}
                    />
                    <Route
                        path="/favorites"
                        element={<Favorite/>}
                        exact
                    />
                </Routes>


            </div>
        </AppContext.Provider>
    );
}

export default App;
