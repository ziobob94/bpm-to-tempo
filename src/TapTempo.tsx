import React, { useCallback, useState} from 'react';

const colorsArray = ["#63277CBF", "#db6169","#6576bd","#495e2a"];


interface Beat {
    ts: Date
}

interface TapTempoProps{
    onBpmChange : (num : number) => void;
}


const TapTempo : React.FC<TapTempoProps> = ({onBpmChange}) => {
    const [color,setColor] = useState<string>("#63277CBF");
    const [bpmCalc, setBpmCalc] = useState<number>(0)
    const [stars, setStars] = useState<string>("")
    const [beats, setBeats] = useState<Beat[]>([])

    const style = {
        background: color,
    }

    let initTapper = useCallback(() => {
        setColor(colorsArray[0]);
        setBpmCalc(0)
        setStars("")
        setBeats([])
    },[])


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
            if(count === 15) {
                setStars(`${stars} 👽`);
            } else {
                setStars(`${stars} 👽    -`);
            }
            setBpmCalc(bpm);
            onBpmChange(bpm);
        } else {
            setBeats([...beats, newBeat]);
            if(count < 15) {
                setStars(`${stars} 👽`);
            } else {
                setStars("👽");
            }
        }

    }, [beats]);


    return (
        <>
            <div className="TapTempo-wrapper" onMouseDown={addBeat} style={style}>
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
