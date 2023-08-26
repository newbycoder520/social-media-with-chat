// import { useContext } from "react";
import "./stories.scss"
// import { AuthContext } from "../../context/authContext"
// import User from "User/User";
import { useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";

const Stories = () => {

   const user = useSelector((state) => state.user);

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "Barry Allen",
      img: "../assets/flash.jpg",
    },
      {
        id: 2,
      name: "Lucas Fox",
      img: "../assets/batwing.jpg",
    },
    {
      id: 3,
      name: "Peter Parker",
      img: "../assets/spiderman.jpg",
    },
    {
      id: 4,
      name: "Eduardo Dorrance",
      img: "../assets/bane.jpg",
    },
  ];

    return (
      <WidgetWrapper>
    <div className="stories">
      <div className="story">
          <img src={user.profilePic} alt="" />
          <span>{user.name}</span>
          <button>+</button>
        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div></WidgetWrapper>
  )
}

export default Stories