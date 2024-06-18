"use client";

import { useEffect, useState } from "react";
import Results from "@/components/Results";
import GenreButton from "@/components/GenreButton";

const API_KEY = process.env.API_KEY;

export default function Home({ searchParams }) {
  const [results, setResults] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.page) || 1);
  const [totalPages, setTotalPages] = useState(0);

  const genre = searchParams.genre || 'fetchTrending';

  useEffect(() => {
    const fetchMovies = async () => {
      const today = new Date().toISOString().split('T')[0];
      const year = new Date().getFullYear();
      const firstDayOfYear = `${year}-01-01`;
      const lastDayOfYear = `${year}-12-31`;

      const discoverUrl = genre === 'fetchTrending'
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_date.gte=${firstDayOfYear}&primary_release_date.lte=${lastDayOfYear}&page=${currentPage}`
        : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_date.lte=${today}&with_genres=${genre}&page=${currentPage}`;

      try {
        const response = await fetch(discoverUrl);
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setResults(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [genre, currentPage]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const genresData = await genresResponse.json();
        setGenresList(genresData.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenresList([]); // Definir uma lista vazia em caso de erro
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 py-5">
        {genresList.length > 0 ? (
          genresList.map((genre) => (
            <GenreButton key={genre.id} genreId={genre.id} genreName={genre.name} />
          ))
        ) : (
          <p>Carregando gêneros...</p> // Ou outra mensagem de carregamento
        )}
      </div>
      <Results results={results} genres={genresList} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}
