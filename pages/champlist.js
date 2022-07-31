import React, { useEffect, useState, useRef } from 'react' // <--- import the hook

function ChampList(props) {
    const [marked, setMarked] = useState([])
    const [champs, setChamps] = useState(props.champs ?? [])
    const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/'

    useEffect(() => {
        setChamps(props.champs)
        console.log('Loading:', localStorage.getItem('lol-marked'))
        if (JSON.parse(localStorage.getItem('lol-marked'))) {
            setMarked([...JSON.parse(localStorage.getItem('lol-marked'))])
        }
    }, [props.champs])

    const isInitialMount = useRef(true)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            console.log('Saving:', marked)
            localStorage.setItem('lol-marked', JSON.stringify(marked.filter((curr) => curr !== -1))) // filter out -1, meaning filler boxes
        }
    }, [marked])

    const markAsPlayed = (champId) => {
        setMarked((prev) => {
            if (prev.includes(champId)) {
                return [...prev.filter((curr) => curr !== champId)]
            } else {
                return [...prev, champId]
            }
        })
    }

    return (
        <ul
            className="grid gap-2 justify-between"
            style={{
                gridTemplateColumns: 'repeat(auto-fill, 120px)',
            }}
        >
            {Object.keys(champs).map((champKey) => {
                const champ = champs[champKey]

                return (
                    <li key={champ.key}>
                        <img
                            src={baseUrl + champ.image.full}
                            onClick={() => markAsPlayed(champ.key)}
                            style={{ opacity: marked.includes(champ.key) ? '40%' : '100%' }}
                        />
                        <div className="grid w-30 h-8 place-content-center">{champ.name}</div>
                    </li>
                )
            })}
        </ul>
    )
}

export default ChampList
