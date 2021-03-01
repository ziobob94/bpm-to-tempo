/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useRef} from "react";
import {convertFunction, NormalTempo} from "./tempos";

interface TemposCollectionsProps {
    bpm : number;
    multiplier : number;
}

export const TemposCollections : React.FC<TemposCollectionsProps> =  ({bpm, multiplier}) => {

    type StringsToInsert = {
        signature : string,
        collectionTitle : string
    }

    let stringsToInsert : StringsToInsert = {
        signature : "",
        collectionTitle : "",
    }


    let setStringsToInsert = () => {
       if (multiplier > 1)  {
           stringsToInsert.signature = ".";
           stringsToInsert.collectionTitle = "DOTTED"
       }
       if (multiplier === 1) {
           stringsToInsert.signature = "";
           stringsToInsert.collectionTitle = "NORMAL"
       }
       if (multiplier < 1) {
           stringsToInsert.signature = "t";
           stringsToInsert.collectionTitle = "TRIPLET";
       }
    }

    setStringsToInsert();

    let measure : string;

    const style = {
        background: "#63277cbf",
        borderColor : "#ddfcff36",
    }

    const style2 = {
        background: "#2e855385",
        borderColor : "#ddfcff36",
    }

    const style3 = {
        background: "#194a2a66",
        borderColor : "#ddfcff36",
    }

    const ulRef = useRef<any>(null);
    //const fakeRef = useRef<any>(null);
    let isDown : boolean = false;
    let startX : number;
    let scrollLeft : number;

    let insertMeasures  = (multiply : number) => {
        let g = (((convertFunction(bpm, multiply))) * multiplier);
        if (g > 1000) {
            measure = " s";
            return (g / 1000).toFixed(1);
        }
        else {
            measure = " ms";
            return g.toFixed(1);
        }
    }


    let insertElements = () =>  NormalTempo.map(({name, multiply},i) => {
            let intstyle ;
            intstyle = (multiply === 1) ?  style : (i%2 === 0) ? style2 : style3;

            return (
                <li className="TempoValues-containers" key={name + multiplier.toString()} style={intstyle}>
                    <h5 className="Tempos"
                        key={name}
                        id={name + multiplier.toString()}>
                        {name + stringsToInsert.signature}
                    </h5>
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


    let mouseDownHandler = useCallback( (e) => {
        e.preventDefault();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isDown = true;
        ulRef.current.classList.add("active");
        // eslint-disable-next-line react-hooks/exhaustive-deps
        startX = e.pageX - ulRef.current.offsetLeft;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollLeft = ulRef.current.scrollLeft;
    },[isDown]);

    let mouseUpHandler = useCallback( (e) => {
        e.preventDefault();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isDown = false;
        ulRef.current.classList.remove("active");
    },[isDown]);

    let mouseLeaveHandler = useCallback( (e) => {
        e.preventDefault();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isDown = false;
        ulRef.current.classList.remove("active");
    },[isDown])
    
    let mouseMoveHandler = useCallback( (e) => {
        e.preventDefault();
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - ulRef.current.offsetLeft;
        const walk = (x - startX) * 3;
        ulRef.current.scrollLeft = scrollLeft - walk;
    },[isDown])



    return (
        <div className="TemposList-wrapper">

            <div id="first-element"
                 style={style}>
                <h6>
                    {stringsToInsert.collectionTitle}
                </h6>
                <h5>
                    BARS
                </h5>
            </div>
            <ul className="TemposValues-wrapper"
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
                onMouseLeave={mouseLeaveHandler}
                onMouseMove={mouseMoveHandler}
                ref={ulRef}>
                { insertElements() }
            </ul>
        </div>
    )
}

