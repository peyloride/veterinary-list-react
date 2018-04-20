import React from 'react';

const Pagination = (props) => {
  const { page, handlePaginationClick } = props;

  return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        disabled={page <= 1}
        onClick={() => handlePaginationClick('prev')}
      >
        &larr;
      </button>

      <button
        className="Pagination-button"
        onClick={() => handlePaginationClick('next')}
      >
        &rarr;
      </button>
    </div>
  );
}

export default Pagination;