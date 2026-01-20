function Gif({ gif }) {
  return (
    <div className="gif">
      <img src={gif.images.original.url} alt={gif.title} />
      <p>{gif.title}</p>
    </div>
  );
}

export default Gif;

