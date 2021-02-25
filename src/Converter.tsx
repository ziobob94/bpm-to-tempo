import React, {ChangeEvent, useCallback} from 'react';
import './App.css';
import {convertFunction} from "./tempos"


interface ConverterProps {
    onBpmChange : (num : number) => void;
    bpm : number;
}


const Converter : React.FC<ConverterProps> = ({onBpmChange,bpm}) => {

    let bpmChange = useCallback((e : ChangeEvent<HTMLInputElement>) => {
        let str = e.target.value
        let num: number = +str;
        onBpmChange(num);
    },[]);



    return (
             <div className="Converter-wrapper">
                     <form className="Converter-form">
                         <h4>INSERT BPM</h4>
                         <input className="My-input" id="bpm-input" type="number" onChange={ bpmChange } placeholder="120" min="0" max="500"/>
                         <div className="My-input" id="conversion-result">
                             <h4>{convertFunction(bpm).toFixed(2)}</h4>
                         </div>
                         <h4>MS</h4>
                     </form>
            </div>
    )
}

export default Converter;
