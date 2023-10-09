import React, { useContext, useEffect, useState } from "react";
import GalleriesContext from "../storage/GalleriesContext";
import { getGalleries } from "../services/galleryService";
import GalleryRow from "../components/GalleryItem"; 

const Home = () => {
  const { galleries, updateGallery } = useContext(GalleriesContext);
  const [searchParam, setSearchParam] = useState("");
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    getGalleries().then(({ data }) => {
      updateGallery(data.data);
    });
  }, [updateGallery]);

  const handleFilter = (e) => {
    e.preventDefault();

    let filteredGalleries = [];

    if (searchParam) {
      filteredGalleries = galleries.filter((gallery) => {
        return (
          gallery.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          gallery.description.toLowerCase().includes(searchParam.toLowerCase()) ||
          gallery.user.first_name.toLowerCase().includes(searchParam.toLowerCase()) ||
          gallery.user.last_name.toLowerCase().includes(searchParam.toLowerCase())
        );
      });
    } else {
      filteredGalleries = galleries;
    }

    setFilteredGalleries(filteredGalleries);
    setIsFilterApplied(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="d-flex mt-5" onSubmit={handleFilter}>
          <input
            type="text"
            id="filter"
            className="form-control mr-2"
            placeholder="Search for gallery"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-info text-light bg-info" id="btn-filter">
            Filter
          </button>
        </form>
      </div>
      <div
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
        style={{ margin: "auto" }}
      >
        {isFilterApplied && filteredGalleries.length === 0 ? (
          <h1 className="no-galleries">No galleries found</h1>
        ) : (
          (filteredGalleries.length > 0 ? filteredGalleries : galleries)?.map(
            (gallery, id) => <GalleryRow key={id} gallery={gallery} id={id} />
          )
        )}
      </div>
    </div>
  );
};

export default Home;