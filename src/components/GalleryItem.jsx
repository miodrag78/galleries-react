const GalleryRow = ({ gallery }) => {
    const formattedDate = new Date(gallery.created_at).toLocaleString();
    const urls = JSON.parse(gallery.urls || "[]");
    const firstImageUrl = urls[0] || "";
    const description = gallery.description
      ? gallery.description.substring(0, 50) + "..."
      : "No description";
  
    return (
      <div className="gallery-item">
        <div className="gallery-card">
          <a href={`/galleries/${gallery.id}`}>
            <img
              className="gallery-img"
              src={firstImageUrl}
              alt={`${gallery.name}`}
            />
          </a>
          <div className="gallery-card-body">
            <div>
              <h3>
                <a href={`/galleries/${gallery.id}`} className="gallery-title">
                  {gallery.name}
                </a>
              </h3>
            </div>
            <p className="gallery-description">{description}</p>
            <div className="gallery-actions">
              <div className="btn-group">
                <a href={`/galleries/${gallery.id}`}>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                  >
                    View
                  </button>
                </a>
              </div>
              <a
                href={`/authors/${gallery.user?.id}`}
                className="gallery-author"
              >
                <small className="text-muted">
                  Author: {gallery.user?.first_name} {gallery.user?.last_name}
                </small>
              </a>
            </div>
            <small className="gallery-posted-date">
              Posted {formattedDate}
            </small>
          </div>
        </div>
      </div>
    );
  };
  
  export default GalleryRow;