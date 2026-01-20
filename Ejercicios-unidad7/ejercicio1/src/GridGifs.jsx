import Gif from "./Gif";

function GridGifs({ gifs }) {
  return (
    <div className="grid">
      {gifs.map((gif) => (
        <Gif key={gif.id} gif={gif} />
      ))}
    </div>
  );
}

export default GridGifs;

