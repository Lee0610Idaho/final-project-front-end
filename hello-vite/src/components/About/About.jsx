import "./About.css";
import Avatar from "../../assets/about-photo.png";

function AboutAuthor() {
  return (
    <section className="about">
      <div className="about__avatar">
        <img src={Avatar} alt="avatar" className="about__image" />
      </div>
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          My name is Jackie Lee. This application was built using React.js for
          the frontend, along with modern JavaScript. I implemented functional
          components and React Hooks (useState, useEffect) to control the state
          and side effects.
        </p>
        <p className="about__text">
          For API interactions, this project fetches news articles based on user
          input into the search bar. The project also features dynamic UI
          behavior like conditional rendering to create a smooth user
          experience. This project showcases my skills in frontend development
          in React.
        </p>
      </div>
    </section>
  );
}

export default AboutAuthor;
