import React, { useEffect, useState } from "react";
import { getUserGalleries, getUserById } from "../services/userService";
import { useParams } from "react-router-dom";

const UsersGalleries = () => {
  const { id } = useParams();
  const [galleries, setGalleries] = useState([]);
  const [author, setAuthor] = useState(null);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    if (id) {
      getUserGalleries(id).then(({ data }) => {
        setGalleries(data.galleries);
        setFilteredGalleries(data.galleries);
        getUserById(id).then(({ data }) => {
          setAuthor(data.user);
        });
      });
    }
  }, [id]);

  const handleFilter = (e) => {
    e.preventDefault();

    let filteredGalleries = [];

    if (searchParam) {
      filteredGalleries = galleries.filter((gallery) => {
        return (
          gallery.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          gallery.description.toLowerCase().includes(searchParam.toLowerCase())
        );
      });
    } else {
      filteredGalleries = galleries;
    }

    setFilteredGalleries(filteredGalleries);
  };

  return (
    <div>
      {author && (
        <h1>
          Author: {author.first_name} {author.last_name}
        </h1>
      )}
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form className="d-flex mt-3" onSubmit={handleFilter}>
            <input
              type="text"
              id="filter"
              className="form-control mr-2"
              placeholder="Search"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-outline-info text-light bg-info"
            >
              Filter
            </button>
          </form>
        </div>
        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {Array.isArray(filteredGalleries) && filteredGalleries.length > 0 ? (
            filteredGalleries.map((gallery, id) => (
              <div key={id} className="col m-5">
                <a href={`/galleries/${gallery.id}`}>
                  <img
                    className="card-img-top"
                    src={JSON.parse(gallery.urls || "[]")[0]}
                    alt={`${gallery.name}`}
                    width="85"
                    height="350"
                  />
                </a>

                <div className="card shadow-sm">
                  <h3>
                    <a
                      href={`/galleries/${gallery.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {gallery.name}
                    </a>
                  </h3>
                  <p className="mb-1 text-body-secondary">
                    <a
                      href={`/authors/${author?.id}`}
                      style={{
                        textDecoration: "none",
                        color: "darkslategrey",
                      }}
                    >
                      Author: {author?.first_name} {author?.last_name}
                    </a>
                  </p>
                  <p className="card-text mb-auto">
                    Description:{" "}
                    {gallery.description
                      ? gallery.description.substring(0, 50) + "..."
                      : "No description"}
                  </p>
                  <p className="card-text mb-auto">
                    Posted:{" "}
                    {new Date(gallery.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="container mt-5" style={{ width: "auto" }}>
              No galleries found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersGalleries;