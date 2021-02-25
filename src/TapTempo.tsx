import React, {useCallback, useState} from 'react';

const colorArray = ["#63277CBF","#E58E94","#BECD8A","#ADBD66"];


const TapTempo : React.FC = () => {

    let [color,setColor] = useState("#63277CBF");
    let [index,setIndex] = useState(1);
    let [timesArray,setTimesArray] = useState([null,null,null,null]);
    let [mouseDownTime,setMouseDownTime] = useState(null);
    let [average,setAverage] = useState(null);

    let changeColor = useCallback((e : any) => {
        e.preventDefault();
        let time = {};
        if ( index === 3 ){
            for (let i=0; i<timesArray.length; i++){

            }
        }
        setIndex((index + 1)%4);
        setColor(colorArray[index]);
    },[index])

    const style = {
        background: color,
    }

    return (
        <div className="TapTempo-wrapper" onMouseDown={changeColor} style={style}>
                <h2>TAP TEMPO</h2>
                    {index}
                    {average}

                <div className="Circles-wrapper">

                </div>
        </div>
    );
}

export default TapTempo;