import App from "next/app";

import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Container, baseStyles } from "unified-ui";

import CodeBlock from "../components/CodeBlock";

import "./index.css";

const components = {
  // h1: props => <h1 style={{ color: 'tomato' }} {...props} />,
  pre: props => <div {...props} />,
  code: CodeBlock
};

export default props => {
  const { Component, pageProps } = props;
  return (
    <div>
      <MDXProvider components={components}>
        <>
          <Container {...props}>
            <Component {...pageProps} />
          </Container>
        </>
      </MDXProvider>
      <style jsx>{`
        margin: 0 auto;
        width: 760px;
      `}</style>
    </div>
  );
};
