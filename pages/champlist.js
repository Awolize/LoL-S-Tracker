import React, { useEffect, useState } from 'react'; // <--- import the hook

function ChampList(props) {
    const [marked, setMarked] = useState([]);
    const [champs, setChamps] = useState(props.champs ?? []);

    useEffect(() => {
        setChamps(props.champs)

        console.log(localStorage.getItem('lol-marked'));
        if (JSON.parse(localStorage.getItem('lol-marked')))
            setMarked([...JSON.parse(localStorage.getItem('lol-marked'))])
    }, [props.champs])


    const markAsPlayed = (champId) => {
        setMarked(prev => {
            if (prev.includes(champId)) {
                localStorage.setItem('lol-marked', JSON.stringify([...prev.filter((curr) => curr !== champId)]));
                return [...prev.filter((curr) => curr !== champId)]
            }
            else {
                localStorage.setItem('lol-marked', JSON.stringify([...prev, champId]));
                return [...prev, champId];
            }
        })
    }

    useEffect(() => {
    }, [marked, setMarked])

    return (
        <ul style={{ width: "100vw" }} className="flex flex-wrap justify-between">
            {champs.map((champ) => (
                <li key={champ.key}>
                    <img src={champ.icon} className="grid rounded place-content-center" onClick={() => markAsPlayed(champ.key)} style={{ opacity: marked.includes(champ.key) ? "40%" : "100%" }} />
                    <div className="grid w-32 h-10 rounded place-content-center">{champ.name}</div>
                </li>
            ))}
        </ul>
    )
}





export default ChampList