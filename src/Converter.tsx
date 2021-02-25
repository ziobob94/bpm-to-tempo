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
                         <h2>INSERT BPM</h2>
                         <input className="My-input" id="bpm-input" type="number" onChange={ bpmChange } placeholder="120 bpm"/>
                         <div id="conversion-result"> {convertFunction(bpm).toFixed(2)}</div>
                         <h2>MS</h2>
                     </form>
            </div>
    )
}

export default Converter;
