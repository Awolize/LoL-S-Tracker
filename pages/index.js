//pages/index.js
import Head from 'next/head'
import ChampList from './champlist.js'
export default function Home(props) {
    return (
        <div>
            <Head>
                <title>LoL S- Tracker</title>
                <link rel="icon" href="https://pbs.twimg.com/media/EgTaaXvWkAErH0i?format=png&name=360x360" /*"/favicon.ico"*/ />
                <meta property="og:image" content="https://pbs.twimg.com/media/EgTaaXvWkAErH0i?format=png&name=360x360" />
                <meta property="og:title" content="League of legends S- Tracker" />
                <meta property="og:description" content="Source code can be found at github/Awolize/LoL-S-Tracker" />
            </Head>
            <ChampList champs={props.data} />
        </div>
    )
}

// Fetching data from the JSON file
import fsPromises from 'fs/promises'
import path from 'path'

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const filePath = path.join(process.cwd(), 'champions.json')
    const dataJson = await fsPromises.readFile(filePath)
    let data = JSON.parse(dataJson)

    // Only send the necessary data to the client.
    // console.log('Complete data:', data['Aatrox'])
    data = Object.keys(data).map((key) => {
        const champ = {}
        champ.id = data[key].id
        champ.key = data[key].key
        champ.name = data[key].name
        champ.image = data[key].image
        return champ
    })
    // console.log('Kept data:', data[0])

    // By returning { props: { champs } }, the Blog component
    // will receive `champs` as a prop at build time
    return {
        props: {
            data,
        },
    }
}
