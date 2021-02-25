import React, {useState} from 'react';
import './App.css';
import Converter from "./Converter";
import TapTempo from "./TapTempo";
import {TemposCollections} from "./TemposCollections";
import {dotMultiplier, tripletMultiplier} from "./tempos";


const App : React.FC = () => {
    const [bpm,setBpm] = useState(120);

    let updateBpm = (bpm : number) => {
        setBpm(bpm)
    }

    return (
        <div className="App-wrapper">
            <header className="App-header">
                <h1>BPM TO TEMPO CONVERTER</h1>
            </header>
            <TapTempo/>
            <Converter onBpmChange={updateBpm} bpm={bpm}/>
            <div className="TempoShowing-wrapper" >

                <div className="TemposMetrics" id={"normal-multi"}>
                    <h2> NORMAL </h2>
                    <TemposCollections bpm={bpm} multiplier={1}/>
                </div>
                <div className="TemposMetrics">
                    <h2> DOTTED </h2>
                    <TemposCollections bpm={bpm} multiplier={dotMultiplier}/>
                </div>
                <div className="TemposMetrics">
                    <h2> TRIPLETS </h2>
                    <TemposCollections bpm={bpm} multiplier={tripletMultiplier}/>
                </div>
            </div>
            <footer/>
        </div>
    );
}

export default App;
