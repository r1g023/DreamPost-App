import React from "react";

const PostShareButtons = () => {
  return (
    <div className="shareButtonContainer">
      {/* facebook */}
      <a
        href="https://facebook.com"
        rel="noopener noreferrer"
        target="_blank"
        className="fa fa-facebook"
        alt="fblogo">
        {" "}
      </a>
      {/* twitter */}
      <a
        href="https://twitter.com"
        rel="noopener noreferrer"
        target="_blank"
        className="fa fa-twitter"
        alt="twitlogo">
        {" "}
      </a>
      {/* linkedin */}
      <a
        href="https://linkedin.com"
        rel="noopener noreferrer"
        target="_blank"
        className="fa fa-linkedin"
        alt="linkedinlogo">
        {" "}
      </a>
      {/* youtube */}
      <a
        href="https://youtube.com"
        rel="noopener noreferrer"
        target="_blank"
        className="fa fa-youtube"
        alt="youtubelogo">
        {" "}
      </a>
      {/* instagram */}
      <a
        href="https://instagram.com"
        rel="noopener noreferrer"
        target="_blank"
        className="fa fa-instagram"
        alt="instalogo">
        {" "}
      </a>
      {/* Google */}
      <a
        href="https://google.com"
        rel="noopener noreferrer"
        target="_blank"
        className="fa fa-google"
        alt="googlelogo">
        {" "}
      </a>
    </div>
  );
};

export default PostShareButtons;
