import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

const Comments = ({ comments, user, handleDeleteComm, loggedIn }) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getUsers().then(({ data }) => {
      setUsers(data.users);
    });
  }, []);

  return (
    <div className="comments-container">
      <h2 className="comments-heading">Comments ({comments?.length})</h2>
      {comments?.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-box">
            <div className="comment-header">
              <p className="comment-date">
                Posted: {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
            <textarea
              disabled
              rows="3"
              className="comment-textarea"
              value={comment.description}
            ></textarea>
            <div className="comment-footer">
              <p className="comment-author">
                By:{" "}
                {Array.isArray(users) ? (
                  (() => {
                    const user = users.find(
                      (user) => user.id === comment.user_id
                    );
                    return user
                      ? `${user.first_name} ${user.last_name}`
                      : null;
                  })()
                ) : null}
              </p>
              {loggedIn && user.id === comment.user_id ? (
                <button
                  className="comment-delete-button"
                  onClick={() => handleDeleteComm(comment.id)}
                >
                  Delete Comment
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;