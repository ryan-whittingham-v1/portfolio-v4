function Project({ date, image, title }) {
  /*   let { file, description } = image;
   */
  return (
    <div>
      {/* <img alt={description} src={`https:${file.url}`} /> */}
      {/* <div>{description}</div> */}
      <div>
        <h2>{title}</h2>
        <h3>{date.substring(0, 10)}</h3>
      </div>
    </div>
  );
}

export default Project;
