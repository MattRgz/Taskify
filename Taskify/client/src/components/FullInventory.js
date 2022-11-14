import React,{useEffect,useState} from 'react';
import SearchBar from '../components/SearchBar';
import InventoryItem from '../components/InventoryItem';


const FullInventory = () => {
    const [visible, setVisible] = useState(true);
    const renderMyLabel = (e) =>{
        e.preventDefault();
        setVisible(!visible)
    }

    const labelButton = <div className='AddUnespectedProduct'>
    <h3 className='labelTransition' onClick={renderMyLabel} style={{fontsize: '23px'}} >Añadir producto al inventario</h3>
</div>
const addUnespected =   <div className='AddUnespectedProduct1'>
                            <div style={{width:'100%',height:'100%'}}>
                                <form className='centrar formUnespectedProduct'>
                                    <input className='letraSecundaria inputUnespectedProduct' type="text" placeholder='Nombre producto'/>
                                    <input className='letraSecundaria inputUnespectedProduct' type="number" placeholder='Cantidad' />
                                    <div>
                                        <input className='letraSecundaria button' type="submit" />
                                        <button onClick={renderMyLabel} className=' letraSecundaria button formToLabelTransition'>Cerrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
    return (
        <>
            <SearchBar/>
            <InventoryItem/>
            {/* ACA HAY QUE RENDERIZAR LO QUE LLEGUE DEL BACK CON EL INVENTORYITEM */}
            {
                visible ?  labelButton : addUnespected
            }
        </>
    );
}

export default FullInventory;
