import { GatsbySSR } from 'gatsby';
import React from 'react';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  return setHeadComponents([
    <link key="Inter" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />,
  ]);
};
