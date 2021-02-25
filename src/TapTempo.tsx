import React, { useCallback, useState} from 'react';

const colorsArray = ["#63277CBF", "#E58E94","#BECD8A","#ADBD66"];


type Beat = {
    ts: Date
}

const TapTempo : React.FC = () => {
    const [color,setColor] = useState("#63277CBF");
    const [cursor,setCursor] = useState("");
    const [bpm, setBpm] = useState<number>(0)
    const [stars, setStars] = useState<string>("")


    const [beats, setBeats] = useState<Beat[]>([])


    const style = {
        background: color,
        cursor : cursor,
    }


    let initTapper = useCallback(() => {
        setColor(colorsArray[0]);
        setBpm(0)
        setStars("")
        setBeats([])
    },[])


    let cursorChange = useCallback( (e : any ) => {
        setCursor("pointer")
    },[]);

    const addBeat = useCallback(() => {
        const newBeat: Beat = {
            ts: new Date()
        }
        const count = (stars.match(/\👽/g) || []).length;
        setColor(colorsArray[count % 4])
        if (beats.length === 3){
            const t1: number = beats[1].ts.getTime() - beats[0].ts.getTime()
            const t2: number = beats[2].ts.getTime() - beats[1].ts.getTime()
            const t3: number = newBeat.ts.getTime() - beats[2].ts.getTime()
            const avg = Math.abs((t1 + t2 + t3) / 3)
            const bpm = 60000 / avg
            setBeats([])
            if(count === 15) {
                setStars(`${stars} 👽`)
            } else {
                setStars(`${stars} 👽    -`)
            }
            setBpm(bpm)
        } else {
            setBeats([...beats, newBeat])
            if(count < 15) {
                setStars(`${stars} 👽`)
            } else {
                setStars("👽")
            }
        }

    }, [beats])


    return (
        <>
            <div className="TapTempo-wrapper" onMouseDown={addBeat} onMouseOver={cursorChange} style={style}>
                <h2>TAP TEMPO</h2>
                <h2>{Math.round(bpm)}</h2>
                <h2>{stars}</h2>
            </div>
            <button onMouseDown={initTapper} className="My-button" id="resetbutton">
                <h3>RESET</h3>
            </button>
        </>
);
}

export default TapTempo;
