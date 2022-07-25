//pages/index.js
import Head from "next/head";
import ChampList from "./champlist.js";
export default function Home(props) {
    console.log(props);
    return (
        <div>
            <Head>
                <title> NextJS Image Gallery</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ChampList champs={props.data} />
        </div>
    );
}




// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path'

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const filePath = path.join(process.cwd(), 'champions.json');
    const dataJson = await fsPromises.readFile(filePath);
    const data = JSON.parse(dataJson);

    // By returning { props: { champs } }, the Blog component
    // will receive `champs` as a prop at build time
    return {
        props: {
            data,
        },
    }
}