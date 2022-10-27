import Card from "./components/Card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {useEffect, useState} from "react";

function App() {

    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        fetch('https://635acd496f97ae73a636cf93.mockapi.io/snakers')
            .then(res => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
            })
    }, []);

    const onAddToCart = (obj) => {
        setCartItems(prevState => [...prevState, obj])
    }

    const onDeleteInCart = (id) => {
        console.log(id)
        setCartItems(cartItems.filter(o => o.id !== id))
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
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>

                <div className="d-flex flex-wrap">
                    {/*start cards*/}
                    {items.map((item, index) => (
                        <Card
                            key={index}
                            {...item}
                            onFavorite={() => console.log('liked')}
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    ))}
                    {/*end cards*/}
                </div>
            </div>
        </div>
    );
}

export default App;
