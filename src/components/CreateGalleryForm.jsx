import { useContext, useState, useEffect } from "react";
import GalleriesContext from "../storage/GalleriesContext";
import UserContext from "../storage/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { editGalleryById, getGalleryById } from "../services/galleryService";

const CreateGalleryForm = () => {
  const { addGallery } = useContext(GalleriesContext);
  const { user } = useContext(UserContext);
  const [urls, setUrls] = useState([""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [gallery, setGallery] = useState({
    name: "",
    description: "",
    urls: [],
    user_id: user.id,
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getGalleryById(id).then(({ data }) => {
        setGallery(data);
        setUrls(JSON.parse(data.urls));
      });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (gallery.description.length > 1000) {
      setError("Description must be max 1000 characters long.");
      return;
    }

    if (gallery.name.length === 0) {
      setError("Name field is required.");
      return;
    }

    if (gallery.name.length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    if (gallery.urls.length === 0) {
      setError("Url field is required.");
      return;
    }

    if (Array.isArray(gallery.urls) && gallery.urls.some((url) => url === "")) {
      setError("Please fill in all URL fields or remove them.");
      return;
    }

    const imageExtensions = ["png", "jpg", "jpeg"];

    const urlValidationRegex = /^(http|https):\/\/[^ "]+$/;

    for (const url of gallery.urls) {
      if (!urlValidationRegex.test(url)) {
        setError("Please enter a valid URL.");
        return;
      }

      const fileExtension = url.split(".").pop().toLowerCase();
      if (!imageExtensions.includes(fileExtension)) {
        setError(
          "Please enter a URL ending with a valid image extension (png, jpg, jpeg)."
        );
        return;
      }
    }

    if (id) {
      editGalleryById(id, gallery);
    } else {
      addGallery(gallery.name, gallery.description, gallery.urls, user.id);
      setError("");
      setGallery({
        name: "",
        description: "",
        urls: [],
        user_id: user.id,
      });
    }

    navigate("/");
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;

    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);

    setGallery((prevState) => ({
      ...prevState,
      urls: newUrls,
    }));
  };

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center text-info mb-5">
                    {id ? "Edit gallery" : "Add new gallery"}
                  </h2>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        name="name"
                        value={gallery.name}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example1cg"
                      >
                        Title
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <textarea
                        className="mb-3 form-control"
                        rows="4"
                        cols="50"
                        name="description"
                        value={gallery.description}
                        onChange={handleInputChange}
                      ></textarea>

                      <label
                        className="form-label"
                        htmlFor="form3Example1cg"
                      >
                        Description
                      </label>
                    </div>

                    {Array.isArray(urls)
                      ? urls.map((url, index) => (
                          <div
                            className="form-outline mb-4"
                            key={index}
                          >
                            <input
                              className="form-control"
                              type="text"
                              value={url}
                              onChange={(e) =>
                                handleUrlChange(index, e.target.value)
                              }
                              required
                              pattern=".*\.(png|jpg|jpeg)$"
                              title="Please enter a valid image URL ending with .png, .jpg, or .jpeg"
                            />
                            <label className="form-label">Url</label>
                            <br />
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm mt-2 mb-2"
                                onClick={() => removeUrlField(index)}
                              >
                                Remove URL
                              </button>
                            )}
                          </div>
                        ))
                      : null}

                    <div className="form-outline mb-4">
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={addUrlField}
                      >
                        Add another URL
                      </button>
                    </div>

                    <div className="form-outline mb-4">
                      <button
                        type="submit"
                        className="btn btn-warning btn-lg mt-2 mb-2"
                      >
                        {id ? "Edit gallery" : "Add gallery"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateGalleryForm;