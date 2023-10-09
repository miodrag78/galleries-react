import { useContext, useState } from "react";
import { addComment } from "../services/galleryService";
import UserContext from "../storage/UserContext";

const CreateComment = ({ galleryId, setComments }) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState({
    description: "",
    gallery_id: galleryId,
    user_id: user.id,
  });

  const resetInput = () => {
    setComment({
      description: "",
      gallery_id: galleryId,
      user_id: user.id,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdd = (event, comment) => {
    event.preventDefault();

    addComment(comment.description, galleryId, user.id).then(({ data }) => {
      setComments((prevComments) => [
        ...prevComments,
        {
          ...data,
          created_at: new Date(data.created_at).toLocaleString(),
        },
      ]);
    });

    resetInput();
  };

  return (
    <div className="container mt-5">
      <form onSubmit={(event) => handleAdd(event, comment)}>
        <div className="mb-3">
          <textarea
            onChange={handleInputChange}
            value={comment.description}
            placeholder="Add comment..."
            className="form-control"
            name="description"
          ></textarea>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="btn btn-warning"
            disabled={!comment.description}
          >
            Post comment
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateComment;