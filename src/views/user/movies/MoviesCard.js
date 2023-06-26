import React from "react";
import "./movies.css";

export default function MovieCard({ title, image, description }) {
  return (
    // <Card className="my-3" style={{ width: "18rem" }}>
    //   <Card.Img variant="top" src={image} />
    //   <Card.Body>
    //     <Card.Title>{title}</Card.Title>
    //     <Card.Text>{description}</Card.Text>
    //     <div className="d-flex justify-content-between">
    //       <Button variant="primary">Trailer</Button>
    //       <Button variant="primary">Buy Ticket</Button>
    //     </div>
    //   </Card.Body>
    // </Card>
    <div className="movie_box">
      <span class=" img">
        <a href="/listmovie" >
          <img style={{width:'100%'}}
            src="https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202306/11185_103_100001.jpg"
            alt="Movie Poster"
          />
        </a>
      </span>
      <div class="list_text">
        <dt>{title}</dt>
        <dd>{description}</dd>
      </div>
    </div>
  );
}
