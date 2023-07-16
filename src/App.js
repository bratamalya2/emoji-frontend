import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import api from "./config/api";
import Cards from "./components/cards";
import PageSelector from "./components/pageSelector";
import Filter from "./components/filter";

function App() {
  const [emojis, setEmojis] = useState([]);
  const [currEmojis, setCurrEmojis] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const minPage = 1;
  const [maxPage, setMaxPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [emojiCategories, setEmojiCategories] = useState([]);

  const fetchAllEmojis = async () => {
    try {
      const x = await fetch(api.EmojiApiURL);
      const y = await x.json();
      setEmojis(y);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShow = () => {
    setShowFilter(true);
  };

  const handleClose = () => {
    setShowFilter(false);
  };

  const handleSubmit = () => {
    const categoryArr = emojiCategories
      .filter((ecat) => ecat.isSelected)
      .map((ecat) => ecat.category);
    setCurrEmojis(() => {
      const x = emojis.filter((em) => categoryArr.includes(em.category));
      //update maxPage
      if (x.length > 0) {
        const itemPerPage = 10;
        setMaxPage(Math.ceil(x.length / itemPerPage));
      }
      setCurrentPage(1);
      return x;
    });
  };

  const resetFilters = () => {
    setCurrEmojis(emojis);
    const arr = [];
    emojis.forEach((em) => {
      if (!arr.includes(em.category)) arr.push(em.category);
    });
    const categoryArr = [];
    for (let i of arr) {
      categoryArr.push({
        category: i,
        isSelected: false,
      });
    }
    setCurrentPage(1);
    setEmojiCategories(categoryArr);
    if (emojis.length > 0) {
      const itemPerPage = 10;
      setMaxPage(Math.ceil(emojis.length / itemPerPage));
    }
  };

  useEffect(() => {
    fetchAllEmojis();
  }, []);

  useEffect(() => {
    setCurrEmojis(emojis);
    const arr = [];
    emojis.forEach((em) => {
      if (!arr.includes(em.category)) arr.push(em.category);
    });
    const categoryArr = [];
    for (let i of arr) {
      categoryArr.push({
        category: i,
        isSelected: false,
      });
    }
    setEmojiCategories(categoryArr);
    if (emojis.length > 0) {
      const itemPerPage = 10;
      setMaxPage(Math.ceil(emojis.length / itemPerPage));
    }
  }, [emojis]);

  return emojis.length > 0 ? (
    <div>
      <Filter
        showFilter={showFilter}
        handleClose={handleClose}
        handleShow={handleShow}
        handleSubmit={handleSubmit}
        resetFilters={resetFilters}
        emojiCategories={emojiCategories}
        setEmojiCategories={setEmojiCategories}
      />
      <Cards emojis={currEmojis} currentPage={currentPage} />
      <PageSelector
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        minPage={minPage}
        maxPage={maxPage}
      />
    </div>
  ) : (
    <div className="App">
      <h2>Loading...</h2>
    </div>
  );
}

export default App;
