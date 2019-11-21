import React from "react";

export default function Title() {
  return (
    <header>
      <h1 className="name">
        <span className="store">st</span>
        <span className="hook">ook</span>
      </h1>
      <p>
        manage {`{`}
        <span className="store">store</span>
        {`}`} in {`{`}
        <span className="hook">hooks</span>
        {`}`}
      </p>
      <p>
        如果你喜欢 useState，你肯定会喜欢 <span className="name">stook</span>.
      </p>
      <style jsx>{`
        header {
          text-align: center;
        }
        h1 {
          font-weight: 400;
          margin-bottom: 0;
        }
        .store {
          color: #3cb6a4;
        }
        .hook {
          color: orange;
        }
        p {
          margin: 6px 0;
          font-family: Roboto, -apple-system, BlinkMacSystemFont, Helvetica Neue,
            Segoe UI, Oxygen, Ubuntu, Cantarell, Open Sans, sans-serif;
        }
      `}</style>
    </header>
  );
}
