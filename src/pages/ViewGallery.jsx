import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteCommentById, deleteGalleryById, getGalleryById } from "../services/galleryService";
import CreateComment from "../components/CreateComment";
import UserContext from "../storage/UserContext";
import Comments from "../components/Comments";

const ViewGallery = () => {
  const { loggedIn, user } = useContext(UserContext);
  const [gallery, setGallery] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const formattedDate = new Date(gallery.created_at).toLocaleString();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
        setComments(data.comments);
      });
    }
  }, [id, setComments]);

  const handleDeleteComm = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete the comment?"
    );
    if (shouldDelete) {
      deleteCommentById(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    }
  };

  const handleDeleteGallery = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete the gallery?"
    );
    if (shouldDelete) {
      deleteGalleryById(id);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="row row-cols-1 justify-content-center" style={{ margin: "auto" }}>
        <div className="col m-5" style={{ width: "700px", borderRadius: "5px", opacity: "80%" }}>
          <div className="card shadow-sm">
            <div className="card-body bg-light border rounded border">
              <h3 className="card-text">{gallery.name}</h3>
              <a href={`/authors/${gallery.user?.id}`} style={{ textDecoration: "none", color: "darkslategrey" }}>
                <div className="mb-1 text-body-secondary">
                  Author: {gallery.user?.first_name} {gallery.user?.last_name}
                </div>
              </a>
              <p className="card-text mb-2">Release date: {formattedDate}</p>
              <p className="card-text mb-3">
                Description: {gallery.description}
              </p>
              {loggedIn && user.id === gallery.user_id ? (
                <div className="d-flex justify-content-evenly">
                  <Link
                    className="btn btn-warning"
                    to={`/edit-gallery/${gallery.id}`}
                  >
                    Edit Gallery
                  </Link>
                  <button
                    className="btn btn-danger"
                    type="delete"
                    onClick={() => handleDeleteGallery(gallery.id)}
                  >
                    Delete Gallery
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      
      {loggedIn ? (
        <CreateComment galleryId={id} setComments={setComments} />
      ) : null}
      <Comments
        comments={comments}
        user={user}
        handleDeleteComm={(id) => handleDeleteComm(id)}
        loggedIn={loggedIn}
      />
    </div>
  );
};

export default ViewGallery;