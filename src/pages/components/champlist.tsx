import React, { useEffect, useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ChampList(props) {
  const [marked, setMarked] = useState([] as any);
  const [filteredChamps, setFilteredChamps] = useState({});
  const baseUrl = "https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/";

  useEffect(() => {
    const champsFilteredByRole = {
      Top: [],
      Jungle: [],
      Mid: [],
      Bottom: [],
      Support: [],
    };

    for (const champIndex in props.champs) {
      if (Object.hasOwnProperty.call(props.champs, champIndex)) {
        const champ = props.champs[champIndex];

        champsFilteredByRole[champ.role].push(champ);
      }
    }

    setFilteredChamps(champsFilteredByRole);

    console.log("Loading:", localStorage.getItem("lol-marked"));
    if (JSON.parse(localStorage.getItem("lol-marked") ?? "")) {
      setMarked([...JSON.parse(localStorage.getItem("lol-marked") ?? "")]);
    }
  }, [props.champs]);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log("Saving:", marked);
      localStorage.setItem("lol-marked", JSON.stringify(marked.filter((curr) => curr !== -1))); // filter out -1, meaning filler boxes
    }
  }, [marked]);

  const markAsPlayed = (champId) => {
    setMarked((prev) => {
      if (prev.includes(champId)) {
        return [...prev.filter((curr) => curr !== champId)];
      } else {
        return [...prev, champId];
      }
    });
  };

  return (
    <>
      <header className="mt-2 flex  flex-row justify-center gap-2 text-center leading-loose">
        <div className="rounded-xl bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[3px]">
          <div className="flex h-full flex-col justify-between rounded-lg bg-black  px-4 py-2 text-white ">
            <p className="text-2xl">
              {marked.length} / {Object.keys(props?.champs ?? {}).length}
            </p>
            <p className="text-sm ">
              {" "}
              {((100 * marked.length) / Object.keys(props?.champs ?? {}).length).toFixed(2)}%{" "}
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-row gap-2">
        {/* Could prop be removed, added as default state */}
        {Object.keys(filteredChamps)?.map((role) => {
          const size = filteredChamps[role].length;
          const markedSize = filteredChamps[role].filter((champ) => marked.includes(champ.key)).length;
          const percentage = (100 * markedSize) / size;

          return (
            <div className="w-full p-4" key={role}>
              <div className="text-md flex flex-row justify-center gap-8 align-bottom ">
                <h4 className="my-auto p-2  ">
                  {markedSize} / {size}
                </h4>
                <h4 className="p-2 text-2xl">{role}</h4>
                <h4 className="my-auto p-2 ">{percentage.toFixed(1)}%</h4>
              </div>
              <ul
                className="grid justify-between"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, 90px)",
                }}
              >
                {filteredChamps[role]?.map((champ) => {
                  return (
                    <li className="flex flex-col pb-2" key={champ.key}>
                      {/* Image doesnt work in production, only loads about 6 images and then times out on the rest, container restrictions (ram,etc)? */}
                      <LazyLoadImage
                        src={`${baseUrl}${champ.image.full}`}
                        alt={champ.name}
                        onClick={() => markAsPlayed(champ.key)}
                        style={{ opacity: marked.includes(champ.key) ? "40%" : "100%" }}
                        height={120}
                        width={120}
                      />
                      <div className="text-center text-xs">{champ.name}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ChampList;
