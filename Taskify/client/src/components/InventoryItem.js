import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form'

const InventoryItem = () => {

const [rangeValue, setRangeValue] = useState(0);

    return (
        <div style={{marginTop: "10%",display:"flex", justifyContent:'center'}}>
            <Accordion  style={{width:'100%'}}>
                <Accordion.Item eventKey="0">
                <Accordion.Header className='letraPrincipal'>
                    <div  style={{width:'100%',display:'flex',justifyContent:'space-around'}}>
                        <div>
                            <h4>PRODUCTO</h4> 
                        </div>
                        <div>
                            <h5>{rangeValue}</h5>
                        </div>
                        <div>
                            <button className='button' style={{marginTop:'0px'}}>
                                Se acabó!
                            </button>
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <div className='centrar' style={{width:'100%'}}>
                        <label for='myRange' className='form-label'></label>
                        <input id='myrange'  className='form-range' type="range" min={1} max={10} step="1" onChange={(e)=>setRangeValue(e.target.value)}/>
                    </div>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default InventoryItem;

