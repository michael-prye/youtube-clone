import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AddComment = (props) => {
  const [commentInput, setCommentInput] = useState("");
  const [user, token] = useAuth();
  const navigate = useNavigate();

  async function addComment() {
    console.log("Token: " + token);
    let response = await axios
      .post(`http://127.0.0.1:8000/api/comments/?video=${props.videoId}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          text: commentInput,
        },
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (user != null) {
      addComment();
    } else {
      navigate("/login");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Search</label>
      <input
        type="text"
        value={commentInput}
        onChange={(event) => setCommentInput(event.target.value)}
      />
    </form>
  );
};

export default AddComment;