import React from "react";

const PostShareButtons = () => {
  return (
    <div>
      {/* <!-- Sharingbutton Facebook --> */}
      <a
        className="resp-sharing-button__link"
        href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io"
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--normal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18.77 7.5H14.5V5.6c0-.9.6-1.1 1-1.1h3V.54L14.17.53C10.24.54 9.5 3.48 9.5 5.37V7.5h-3v4h3v12h5v-12h3.85l.42-4z" />
            </svg>
          </div>
        </div>
      </a>

      {/* <!-- Sharingbutton Twitter --> */}
      <a
        className="resp-sharing-button__link"
        href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io"
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--normal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M23.4 4.83c-.8.37-1.5.38-2.22.02.94-.56.98-.96 1.32-2.02-.88.52-1.85.9-2.9 1.1-.8-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.04.7.12 1.04-3.78-.2-7.12-2-9.37-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.73-.03-1.43-.23-2.05-.57v.06c0 2.2 1.57 4.03 3.65 4.44-.67.18-1.37.2-2.05.08.57 1.8 2.25 3.12 4.24 3.16-1.95 1.52-4.36 2.16-6.74 1.88 2 1.3 4.4 2.04 6.97 2.04 8.36 0 12.93-6.92 12.93-12.93l-.02-.6c.9-.63 1.96-1.22 2.57-2.14z" />
            </svg>
          </div>
        </div>
      </a>

      {/* <!-- Sharingbutton Pinterest --> */}
      <a
        className="resp-sharing-button__link"
        href="https://pinterest.com/pin/create/button/?url=http%3A%2F%2Fsharingbuttons.io&amp;media=http%3A%2F%2Fsharingbuttons.io&amp;description=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking."
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--normal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z" />
            </svg>
          </div>
        </div>
      </a>

      {/* <!-- Sharingbutton Tumblr --> */}
      <a
        className="resp-sharing-button__link"
        href="https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;caption=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;content=http%3A%2F%2Fsharingbuttons.io&amp;canonicalUrl=http%3A%2F%2Fsharingbuttons.io&amp;shareSource=tumblr_share_button"
        target="_blank"
        rel="noopener noreferrer"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--tumblr resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--normal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z" />
            </svg>
          </div>
        </div>
      </a>

      {/* <!-- Sharingbutton E-Mail --> */}
      <a
        className="resp-sharing-button__link"
        href="mailto:?subject=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;body=http%3A%2F%2Fsharingbuttons.io"
        target="_self"
        rel="no"
        aria-label=""
      >
        <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--small">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--normal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M23.5 18c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V6c0-.8.7-1.5 1.5-1.5h20c.8 0 1.5.7 1.5 1.5v12zm-3-9.5L12 14 3.5 8.5m0 7.5L7 14m13.5 2L17 14" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PostShareButtons;
