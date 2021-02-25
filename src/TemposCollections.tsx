import React, {useCallback} from "react";
import {convertFunction, NormalTempo} from "./tempos";

interface TemposCollectionsProps {
    bpm : number;
    multiplier : number;
}

export const TemposCollections : React.FC<TemposCollectionsProps> =  ({bpm, multiplier}) => {

    let signature = useCallback(() => {
        if (multiplier > 1)  return ".";
        if (multiplier === 1) return  "";
        else return "t";
    },[])

    const style = {
        background: "#63277cbf",
        borderRadius : "9%",
        borderColor : "#ddfcff36",
        borderStyle: "groove",
        borderWidth: "thin",
        paddingRight : "0.5%"
    }

    return (
        <ul className="TemposList-wrapper">
            <li className="TempoValues-containers" style={style}>
                <span> BAR </span>
                <span> MS </span>
            </li>
            {
                NormalTempo.map(({name, multiply}) => {
                    if (multiply !== 1) {
                        return (
                            <li className="TempoValues-containers" key={name + multiplier.toString()}>
                                <span className="Tempos" key={name}
                                      id={name + multiplier.toString()}
                                >
                                    <h3>
                                        {name + signature()}
                                    </h3>
                                </span>
                                <span className="TemposValue"
                                      key={name + multiplier}
                                      id={multiplier.toString() + "-multiplier"}
                                >
                                    <p>
                                        {(((convertFunction(bpm, multiply))) * multiplier).toFixed(2)}
                                    </p>
                                    </span>
                            </li>)
                    }
                    else return (
                        <li className="TempoValues-containers" key={name + multiplier.toString()} style={style}>
                                <span className="Tempos" key={name}
                                      id={name + multiplier.toString()}
                                >
                                    <h3>
                                        {name + signature()}
                                    </h3>
                                </span>
                            <span className="TemposValue"
                                  key={name + multiplier}
                                  id={multiplier.toString() + "-multiplier"}
                            >
                                <p>
                                    {(((convertFunction(bpm, multiply))) * multiplier).toFixed(2)}
                                </p>
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    )
}