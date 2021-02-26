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
        if (num > 1000) {
            num = 1000;
            onBpmChange(num);
        }
        if (num < 0 ) onBpmChange(0);
        else onBpmChange(num);
    },[]);


    return (
         <div className="Converter-wrapper">
             <form className="Converter-form" onSubmit={(e)=> e.preventDefault()}>
                 <div className="My-input" id="bpms">
                     <h4 id="bpms-insert">INSERT BPM</h4>
                 </div>
                     <input className="My-input" id="bpm-input" type="number"  onChange={ bpmChange } placeholder="BPM" min={0} max={10000}/>


                <div className="My-input" id="conversion-result">
                     <h4>{convertFunction(bpm).toFixed(1)}</h4>
                     <h4>ms</h4>
                 </div>

                 <div className="My-input" id="conversion-result-seconds">
                     <h4>{convertFunction(bpm*1000).toFixed(2)}</h4>
                     <h4>s</h4>
                 </div>

             </form>
        </div>
    )
}

export default Converter;
