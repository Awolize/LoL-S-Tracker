import React, { useEffect, useState, useRef } from 'react' // <--- import the hook
import Image from 'next/image'

function ChampList(props) {
    const [marked, setMarked] = useState([])
    const [filteredChamps, setFilteredChamps] = useState({})
    const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/'

    useEffect(() => {
        let champsFilteredByRole = {
            Top: [],
            Jungle: [],
            Mid: [],
            Bottom: [],
            Support: [],
        }

        for (const champIndex in props.champs) {
            if (Object.hasOwnProperty.call(props.champs, champIndex)) {
                const champ = props.champs[champIndex]

                champsFilteredByRole[champ.role].push(champ)
            }
        }

        setFilteredChamps(champsFilteredByRole)

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
                {marked.length} / {Object.keys(props.champs).length}
            </header>

            <div className="flex flex-row gap-2">
                {/* Could prop be removed, added as default state */}
                {['Top', 'Jungle', 'Mid', 'Bottom', 'Support'].map((role) => {
                    return (
                        <div className="w-full p-4" key={role}>
                            <h4 className="text-2xl p-2 text-center">{role}</h4>
                            <ul
                                className="grid justify-between"
                                style={{
                                    gridTemplateColumns: 'repeat(auto-fill, 90px)',
                                }}
                            >
                                {filteredChamps[role]?.map((champ) => {
                                    return (
                                        <li className="flex flex-col pb-2" key={champ.key}>
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
                                            <div className="text-center text-xs">{champ.name}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ChampList
