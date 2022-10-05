import React, { useState, useEffect } from "react";
import Axios from "axios";
import MediaCardList from "../components/MediaCardList";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_URL}/favorites/getMyFavorites`,
    })
      .then((response) => {
        setFavorites(response.data);
      })
      .catch(function (error) {
        console.log(error.toJSON());
        toast.error("Getting favorites failed");
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
