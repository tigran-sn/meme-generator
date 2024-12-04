/* eslint-disable no-debugger */
import { useState } from "react";

interface IMeme {
  topText: string;
  bottomText: string;
  imageUrl: string;
}

export default function Main() {
  const [meme, setMeme] = useState<IMeme>({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "https://imgflip.com/s/meme/One-Does-Not-Simply.jpg",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme: IMeme) => ({
      ...prevMeme,
      [name]: value,
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
        <button>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
