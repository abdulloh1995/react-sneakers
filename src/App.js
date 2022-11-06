import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const cartRes = await axios.get('https://635acd496f97ae73a636cf93.mockapi.io/cart')
                const favoriteRes = await axios.get('https://635acd496f97ae73a636cf93.mockapi.io/favorites')
                const itemsRes = await axios.get('https://635acd496f97ae73a636cf93.mockapi.io/snakers')
                setIsLoading(false)

                setCartItems(cartRes.data)
                setFavorites(favoriteRes.data)
                setItems(itemsRes.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData()
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
            if (findItem) {
                setCartItems(prevState => prevState.filter(item => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://635acd496f97ae73a636cf93.mockapi.io/cart/${findItem.id}`)
            } else {
                setCartItems(prevState => [...prevState, obj])
                const {data} = await axios.post('https://635acd496f97ae73a636cf93.mockapi.io/cart', obj)
                setCartItems(prevState => prevState.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))

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

    const onDeleteInCart = async (id) => {
        try {
            setCartItems(cartItems.filter(o => Number(o.id) !== Number(id)))
            await axios.delete(`https://635acd496f97ae73a636cf93.mockapi.io/cart/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }


    return (
        <AppContext.Provider value={{
            items,
            cartItems,
            favorites,
            isItemAdded,
            onAddToFavorite,
            onAddToCart,
            setCartOpened,
            setCartItems
        }}>
            <div className="wrapper clear">
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onDeleteInCart={onDeleteInCart}
                    opened={cartOpened}
                />
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route
                        path=""
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
                        path="favorites"
                        element={<Favorite/>}
                        exact
                    />
                    <Route
                        path="orders"
                        element={<Orders/>}
                        exact
                    />
                </Routes>


            </div>
        </AppContext.Provider>
    );
}

export default App;
