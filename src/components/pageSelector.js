import React, { useEffect, useState } from "react";

import "../styles/pageSelector.css";

function PageSelector({ currentPage, setCurrentPage, minPage, maxPage }) {
  const [availablePages, setAvailablePages] = useState([]);

  const goToPrevPage = () => {
    setCurrentPage((curr) => curr - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((curr) => curr + 1);
  };

  useEffect(() => {
    let i;
    const arr = [];
    for (i = minPage; i <= maxPage; i++) {
      if (i >= Math.max(currentPage - 3, minPage) && i <= currentPage + 2)
        arr.push(i);
    }
    setAvailablePages(arr);
  }, [currentPage, minPage, maxPage]);

  return (
    <div className="page-selector-container">
      {currentPage > minPage ? (
        <div className="page" onClick={goToPrevPage}>
          &lt;
        </div>
      ) : null}
      {minPage < currentPage - 3 ? (
        <div className="page" onClick={() => setCurrentPage(minPage)}>
          {minPage}
        </div>
      ) : null}
      {minPage < currentPage - 3 ? <div>...</div> : null}
      {availablePages.map((page, index) => {
        if (page === currentPage)
          return (
            <div
              key={index}
              className="current-page"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          );
        else
          return (
            <div
              key={index}
              className="page"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </div>
          );
      })}
      {currentPage + 2 < maxPage ? <div>...</div> : null}
      {currentPage + 2 < maxPage ? (
        <div className="page" onClick={() => setCurrentPage(maxPage)}>
          {maxPage}
        </div>
      ) : null}
      {currentPage < maxPage ? (
        <div className="page" onClick={goToNextPage}>
          &gt;
        </div>
      ) : null}
    </div>
  );
}

export default PageSelector;
