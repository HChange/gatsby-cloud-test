# 流程

## 初始化项目

```bash
npm init gatsby -- -y -ts
```

## 插件配置

> 插件地址： <https://www.gatsbyjs.com/plugins>

1.安装插件

```bash
npm install plugin-name
```

2.配置插件

> gatsby-config.ts 文件

```diff
const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby-learn`,
    siteUrl: `https://www.yourdomain.tld`,
  },
+  plugins: ['gatsby-plugin-image', 'gatsby-plugin-sharp'],
};
```

## 使用 GraphQL

### 文档

1. <https://www.howtographql.com/basics/1-graphql-is-the-better-rest/>
2. <https://graphql.org/learn/schema/#union-types>

### useStaticQuery

> 请求 GraphQL 中的数据

```js
import { useStaticQuery, graphql } from 'gatsby';
const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        description
        siteUrl
        title
      }
    }
  }
`);
```

### 注入 props 中

```jsx
import { graphql } from 'gatsby';
import React from 'react';

const All = ({ data }: any) => {
  return <div>All</div>;
};

export default All;

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { time: ASC } }) {
      edges {
        node {
          frontmatter {
            creator
            name
            slug
            time
          }
        }
      }
    }
  }
`;
```

## 引入 MDX

### 依赖安装

> <https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=gatsby-plugin-mdx>
> gatsby-source-filesystem 创建文件节点
> gatsby-plugin-mdx 将文件节点转化为 MDX 节点。为 GraphQL 查询提供了 allMdx 和 mdx 字段。
> @mdx-js/react 将 MDX 实现映射到 React 组件。

```bash
yarn add gatsby-source-filesystem gatsby-plugin-mdx @mdx-js/react -S
```

### 配置

```diff gatsby-config.ts
module.exports = {
  plugins: [
+    `gatsby-plugin-mdx`,
+    {
+      resolve: `gatsby-source-filesystem`,
+      options: {
+        name: `blog`,
+        path: `${__dirname}/src/blog`,
+      },
+    },
  ],
}
```

## 扩展 `gatsby-plugin-mdx` 功能

> gatsby-remark-images 优化图片生成响应图像
> gatsby-remark-prismjs 引入 prismjs mdx 页面添加样式
> gatsby-remark-autolink-header 给 header 添加锚点

### 安装

```bash
yarn add gatsby-remark-images gatsby-remark-prismjs gatsby-remark-autolink-header prismjs -S
```

### 配置

```diff
module.exports = {
  plugins: [
-  `gatsby-plugin-mdx`,
+   {
+      resolve: `gatsby-plugin-mdx`,
+      options: {
+        extensions: [`.md`, `.mdx`], // 设置匹配文件后缀
+        gatsbyRemarkPlugins: [
+          {
+            resolve: `gatsby-remark-autolink-headers`,
+            options: {
+              offsetY: `100`,
+              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
+              maintainCase: true,
+              removeAccents: true,
+              isIconAfterHeader: true,
+            },
+          },
+          `gatsby-remark-images`,
+          `gatsby-remark-prismjs`,
+        ],
+      },
+    },
 ]
}
```

新建`gatsby-browser.js`文件，引入样式
