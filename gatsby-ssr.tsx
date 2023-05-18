import { GatsbySSR } from 'gatsby';
import React from 'react';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  return setHeadComponents([
    <link key="Inter" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />,
    <link rel="stylesheet" href="//g.alicdn.com/chatui/sdk-v2/0.3.2/sdk.css"></link>,
    <script src="//g.alicdn.com/chatui/sdk-v2/0.3.2/sdk.js"></script>,
    <script src="//g.alicdn.com/chatui/extensions/0.1.2/isv-parser.js"></script>,
    <script src="//g.alicdn.com/chatui/icons/2.0.2/index.js" async></script>,
  ]);
};
