import { useState, useEffect } from "react";

interface IMeme {
  topText: string;
  bottomText: string;
  imageUrl: string;
}

interface IMemeServer {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: number;
}

export default function Main() {
  const [meme, setMeme] = useState<IMeme>({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "https://imgflip.com/s/meme/One-Does-Not-Simply.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
      });
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme: IMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMemeImage(allMemes: IMemeServer[]) {
    if (!Array.isArray(allMemes) || allMemes.length === 0) {
      return undefined;
    }
    const randomMeme = allMemes[Math.floor(Math.random() * allMemes.length)];
    setMeme((prevMeme: IMeme) => ({
      ...prevMeme,
      imageUrl: randomMeme.url,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            onChange={handleChange}
            placeholder="One does not simply"
            name="topText"
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            onChange={handleChange}
            placeholder="Walk into Mordor"
            name="bottomText"
          />
        </label>
        <button onClick={() => getMemeImage(allMemes)}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
