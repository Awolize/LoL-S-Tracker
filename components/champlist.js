import React, { useEffect, useState, useRef } from 'react' // <--- import the hook
import Image from 'next/image'

function ChampList(props) {
    const [marked, setMarked] = useState([])
    const [champs, setChamps] = useState(props.champs ?? [])
    const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/'

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
        <>
            <header className="text-2xl text-center leading-loose">
                {marked.length} / {Object.keys(champs).length}
            </header>
            <ul
                className="grid gap-2 justify-between"
                style={{
                    gridTemplateColumns: 'repeat(auto-fill, 120px)',
                }}
            >
                {champs.map((champ) => {
                    return (
                        <li key={champ.key}>
                            {/* Image doesnt work in production, only loads about 6 images and then times out on the rest, container restrictions (ram,etc)? */}
                            <Image
                                src={`${baseUrl}${champ.image.full}`}
                                alt={champ.key}
                                onClick={() => markAsPlayed(champ.key)}
                                style={{ opacity: marked.includes(champ.key) ? '40%' : '100%' }}
                                height={120}
                                width={120}
                                priority
                            />
                            <div className="text-center">{champ.name}</div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default ChampList
