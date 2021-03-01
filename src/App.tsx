import React, {useState} from 'react';
import './App.css';
import Converter from "./Converter";
import TapTempo from "./TapTempo";
import {TemposCollections} from "./TemposCollections";
import {dotMultiplier, tripletMultiplier} from "./tempos";


const App : React.FC = () => {
    const [bpm,setBpm] = useState<number>(0);


    let updateBpm = (bpm : number) => {
        setBpm(bpm)
    }

    return (
        <div className="App-wrapper">
            <header className="App-header">
                <h1>BPM TO TEMPO</h1>
            </header>
            <TapTempo onBpmChange={updateBpm}/>
            <Converter onBpmChange={updateBpm} bpm={bpm}  />
            <div className="TempoShowing-wrapper" >

                <div className="TemposMetrics" id={"normal-multi"}>
                    <TemposCollections bpm={bpm} multiplier={1}/>
                </div>
                <div className="TemposMetrics">
                    <TemposCollections bpm={bpm} multiplier={dotMultiplier}/>
                </div>
                <div className="TemposMetrics">
                    <TemposCollections bpm={bpm} multiplier={tripletMultiplier}/>
                </div>
            </div>
            <footer className="My-footer" >
                <a href="mailto:mauro.ciccullo@hotmail.com"> Contact webmaster </a>
            </footer>
        </div>
    );
}

export default App;
