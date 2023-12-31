import Location from './Location'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CONFIG from './config/config';
import { useEffect, useState } from 'react';
import { mockdata } from './constants/products';
import Spinner from './Spinner';

export default function Product(props) {
    const { productId } = useParams();
    const [product, setProduct] = useState("")

    useEffect(() => {
        if (CONFIG.use_server) {
            async function fetchData() {
                props.setLoading(true);
                const res = await fetch(CONFIG.server_url + "/" + productId);
                const product = await res.json();
                setProduct(product);
                props.setLoading(false);
            }
            fetchData();
        } else {
            props.setLoading(true);
            setTimeout(() => {
                const product = (mockdata.products[productId]);
                setProduct(product);
                props.setLoading(false);
            }, CONFIG.loading_timeout_ms);
        }
        // eslint-disable-next-line
    }, []);


    return props.loading ? <Spinner /> :
        <div className='product-main'>

            <Location />

            <div className='product-container'>
                <img src={product.thumbnail} alt="product"/>
                <div className='product-info'>
                    <h2 id="titulo"> {product.title} </h2>
                    <p><i>{product.description}</i></p>
                    <p>Precio:<b> $ {product.price}</b></p>
                    <p>Rating:<b> {product.rating}</b></p>
                    <p>Stock:<b> {product.stock}</b></p>
                    <p>Marca:<b> {product.brand}</b></p>
                    <p>Categoría:<b> {product.category}</b></p>
                </div>
            </div>

            <Link to='/react-catalog'>
                <button id='volver'>
                    Volver
                </button>
            </Link>

        </div>
}