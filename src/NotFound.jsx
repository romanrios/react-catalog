import Spinner from './Spinner';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function NotFound(props) {

    useEffect(() => {
        props.setLoading(true)
        const timeoutId = setTimeout(() => {
            props.setLoading(false);
        }, 2000); // Simula una carga de 2 segundos (ajusta según tus necesidades)

        return () => {
            clearTimeout(timeoutId); // Limpia el temporizador al desmontar el componente
        };
        // eslint-disable-next-line
    }, []);


    return (props.loading ? <Spinner /> : <div className='notfound'>

        <p id="info">Ruta no encontrada</p>

        <Link to='/react-catalog' className='notfound-volver'><button id='volver'>Volver</button></Link>

    </div>)


}