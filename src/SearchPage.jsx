import CONFIG from './config/config';
import { useEffect, useState } from 'react';
import { mockdata } from './constants/products';
import { Link } from "react-router-dom";

export default function SearchPage(props) {

    const [CANTIDAD, setCANTIDAD] = useState(8);
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [valor, setValor] = useState("");

    useEffect(() => {
        setFilteredResults(props.theproducts);
    }, [props.theproducts]);

    const filterResults = async (query) => {
        if (CONFIG.use_server) {
            const res = await fetch(CONFIG.server_url + "/search?q=" + query);
            const myjson = await res.json();
            const newFilteredResults = myjson.products.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            )
            setFilteredResults(newFilteredResults);
        } else {
            const newFilteredResults = mockdata.products.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredResults(newFilteredResults);
        }
    };

    function handleChange(event) {
        if (event.target.value === "All") {
            setValor(event.target.value);
            setFilteredResults(mockdata.products)
        } else {
            setValor(event.target.value);
            const newFilteredResults = mockdata.products.filter(item =>
                item.category.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setFilteredResults(newFilteredResults);
        };
    }

    function handleChange2(event) {
        setCANTIDAD(event.target.value);
    }


    return <div>
        <h2 id='catalogo'>Catálogo</h2>

        <input id="filtro" type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Artículo" />
        <button id="buscador" onClick={() => filterResults(query)}>Buscar</button>

        <div>
            <select id="selector" value={valor} onChange={handleChange}>
                <option key="All" defaultValue="All">All</option>

                {[...new Set(props.theproducts.map(item => item.category))].map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <select id="selector2" value={CANTIDAD} onChange={handleChange2}>
                <option defaultValue="8">8</option>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="80">80</option>
                <option value="100">100</option>

            </select>
        </div>

        <div id="productosresultados">
            <ul>
                {filteredResults.slice(0, CANTIDAD).map((item) => {
                    return <li className="unproducto" key={item.id}>
                        <img src={item.thumbnail} alt="product"></img>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <Link to={`/react-catalog/products/${item.id}`}>
                            <button>
                                VER
                            </button>
                        </Link>
                    </li>
                })}
            </ul>
            <a href="#top">
                <button className='volver-inicio'>
                    Volver al inicio
                </button>
            </a>
        </div>
    </div>
}