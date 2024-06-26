"use client";

import Link from "next/link";
import Card from "./Card";

export default function Results({ results, genres, currentPage, totalPages, setCurrentPage }) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="max-w-6x1 mx-auto p-4 w-full">
      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xlg:grid-cols-5 max-w-6xl mx-auto p-4 w-f">
        {results && results.length > 0 ? (
          results.map((result) => (
            <Card key={result.id} result={result} genres={genres} />
          ))
        ) : (
          <p>Carregando resultados...</p> // Ou outra mensagem de carregamento
        )}
      </div>

      <div className="flex justify-center items-center my-5">
        <button onClick={handlePreviousPage} disabled={currentPage <= 1} className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50">
          Anterior
        </button>
        <span className="mx-4">Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage >= totalPages} className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50">
          Próxima
        </button>
      </div>
    </div>
  );
}
