import React, {useCallback, useState} from "react";
import {convertFunction, NormalTempo} from "./tempos";

interface TemposCollectionsProps {
    bpm : number;
    multiplier : number;
}

export const TemposCollections : React.FC<TemposCollectionsProps> =  ({bpm, multiplier}) => {

    let signature =  (multiplier > 1)  ? "." : (multiplier === 1) ? "" : "t";
    let measure = "";


    let insertMeasures  = (multiply : number) => {
        let g = (((convertFunction(bpm, multiply))) * multiplier);
        console.log(g)
        if (g > 1000) {
            measure = " s";
            return (g / 1000).toFixed(1);
        }
        else {
            measure = " ms";
            return g.toFixed(1);
        }
    }

    const style = {
        background: "#63277cbf",
        borderRadius : "9%",
        borderColor : "#ddfcff36",
        borderStyle: "groove",
        borderWidth: "thin",
        paddingRight : "0.5%"
    }

    const style2 = {
        background: "#2e855385",
    }

    const style3 = {
        background: "#194a2a66"
    }

    let insertElements = () =>
        NormalTempo.map(({name, multiply},i) => {
            let intstyle ;
            intstyle = (multiply === 1) ?  style : (i%2 === 0) ? style2 : style3;

            return (
                <li className="TempoValues-containers" key={name + multiplier.toString()} style={intstyle}>

                    <span className="Tempos"
                          key={name}
                          id={name + multiplier.toString()}
                    >
                        <h3>
                            {name + signature}
                        </h3>
                    </span>

                    <span className="TemposValue"
                          key={name + multiplier}
                          id={multiplier.toString() + "-multiplier"}
                    >
                        <p>
                            {insertMeasures(multiply)}
                        </p>
                        <p>
                            {measure}
                        </p>
                    </span>
                </li>)
        })

    return (
        <ul className="TemposList-wrapper">
            <li className="TempoValues-containers" style={style}>
                <span> BAR </span>
            </li>
            { insertElements() }
        </ul>
    )
}