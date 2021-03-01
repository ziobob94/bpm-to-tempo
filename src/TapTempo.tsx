import React, { useCallback, useState} from 'react';

const colorsArray = ["#6b7c2e", "#195b51","#40325f","#495e2a"];


interface Beat {
    ts: Date
}

interface TapTempoProps{
    onBpmChange : (num : number) => void;
}


const TapTempo : React.FC<TapTempoProps> = ({onBpmChange}) => {
    const [color,setColor] = useState<string>("#63277CBF");
    const [bpmCalc, setBpmCalc] = useState<number>(0);
    const [stars, setStars] = useState<string>("");
    const [prevClick, setPrevClick] = useState<number>(-1);
    const [counter,setCounter] = useState<number>(0);
    const [timesArray, setTimesArray] = useState<number[]>([]);
    const [diffsArray,setDiffsArray] = useState<number[]>([]);
    const [avg,setAvg] = useState<number>(0);

    let initTapper = useCallback(() => {
        setColor(colorsArray[0]);
        setBpmCalc(0)
        setStars("")
        setPrevClick(-1)
        setCounter(0);
        setTimesArray([]);
        setDiffsArray([]);
        setAvg(0);
        onBpmChange(0);
    },[onBpmChange])


    const style = {
        background: color,
    }

    let diffsAverageCount = (array : number[]) : number => {
        let avg : number= 0;
        let res : number;
        if (array.length > 1) {
            for (let i = 0; i < array.length; i++) avg += array[i]
            res = 60000 / (avg / array.length);
        }
        else res = array[0];
        return 60000/res;
    }


    let starsSetter = (counter : number) : string => {
        let count = (counter%4)+1;
        return "👽".repeat(count);
    }


    let calculateBeatsAverage = useCallback(() => {
        const newBeat: Beat = {
            ts: new Date()
        }
        let actual = newBeat.ts.getTime();
        setCounter(counter+1);
        setColor(colorsArray[counter%4]);

        if ( timesArray.length === 0 ) {
            setTimesArray([...timesArray,newBeat.ts.getTime()]);
            setPrevClick(actual);

        }
        if (timesArray.length >= 1) {
            let diff = Math.abs(actual - prevClick);
            setTimesArray([...timesArray, actual]);
            setDiffsArray([...diffsArray, diff]);
            if (counter%4 === 0){
                setAvg(diffsAverageCount(diffsArray));
                setPrevClick(actual);
                onBpmChange(avg);
            }
            else {
                setPrevClick(actual);
            }
            setBpmCalc(60000/(diff));

        }
        setStars(starsSetter(counter));
    },[counter, timesArray, prevClick, diffsArray, onBpmChange, avg]);

    /*
    const addBeat = useCallback(() => {
        const newBeat: Beat = {
            ts: new Date()
        }
        const count = (stars.match(/👽/g) || []).length;
        setColor(colorsArray[count % 4]);
        if (beats.length === 3){
            const t1: number = beats[1].ts.getTime() - beats[0].ts.getTime();
            const t2: number = beats[2].ts.getTime() - beats[1].ts.getTime();
            const t3: number = newBeat.ts.getTime() - beats[2].ts.getTime();
            const avg = Math.abs((t1 + t2 + t3) / 3);
            const bpm = 60000 / avg;
            setBeats([]);
            if(count === 3) {
                setStars(`${stars} 👽`);
            } else {
                setStars(`${stars} 👽    -`);
            }
            setBpmCalc(bpm);
            onBpmChange(bpm);
        } else {
            setBeats([...beats, newBeat]);
            if(count < 3) {
                setStars(`${stars} 👽`);
            } else {
                setStars("👽");
            }
        }

    }, [beats, onBpmChange, stars]);
    */

    return (
        <>
            <div className="TapTempo-wrapper" onMouseDown={calculateBeatsAverage} style={style}>
                <h2>TAP TEMPO</h2>
                <h2>{Math.round(bpmCalc)}</h2>
                <h2>{stars}</h2>
            </div>

            <div className="Buttons-wrapper">
                <button onMouseDown={initTapper} className="My-button" id="resetbutton">
                    <h3>RESET</h3>
                </button>
            </div>
        </>
);
}

export default TapTempo;
