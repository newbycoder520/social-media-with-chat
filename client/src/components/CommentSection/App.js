import Comments from "./comments/Comments";
import './index.css'
const CommentSection = () => {
  return (
    <div>
      <Comments
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
      />
    </div>
  );
};

export default CommentSection;