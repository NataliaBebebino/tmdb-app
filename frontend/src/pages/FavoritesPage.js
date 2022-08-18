import React, { useState, useEffect } from "react";
import Axios from "axios";
import MediaCardList from "../components/MediaCardList";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/favorites/getMyFavorites",
    }).then((response) => {
      setFavorites(response.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center mt-3 mb-3">My favorites</h1>
      <MediaCardList mediaData={favorites} />
    </div>
  );
};

export default FavoritesPage;
