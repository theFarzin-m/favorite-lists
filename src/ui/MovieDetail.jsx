import React from "react";
import { useFetch } from "../hooks/usefetch";
import { url } from "../assets/variables";
import SpinnerMini from "./SpinnerMini";

export default function MovieDetail({ imdbID }) {
  const { data, isPending } = useFetch(url + "i=" + imdbID);

  if (isPending) return <SpinnerMini />;

  const {
    Title,
    Poster,
    Released,
    Runtime,
    imdbRating,
    Genra,
    Plot,
    Actors,
    Director,
    Writer,
    Year,
  } = data;

  return (
    <div className="card bg-focus text-clear">
    <div className="px-5 pt-1">
      <img src={Poster} alt={`poster of ${Title}`} className="card-img-top" />
    </div>
      <div className="card-body">
        <header>
          <div className="card-title fs-4"> {Title} </div>
          <small>{Year}</small>
          <p>
            {Released} &bull; {Runtime}
          </p>
          <p> {Genra} </p>
          <p>
            <span><i className="bi bi-star-fill text-warning ms-1" /></span>
            {imdbRating} imdb Rating
          </p>
        </header>
        <section className="card-text">
          <p>
            <em> {Plot} </em>
          </p>
          <p> Staring: {Actors} </p>
          <p> Directed by {Director} </p>
          <p> Write by {Writer} </p>
        </section>
      </div>
    </div>
  );
}
