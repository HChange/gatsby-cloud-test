---
name: 'Blog'
creator: 'Change'
time: '2023年4月19日21:32:11'
slug: 'jqx'
router: 'jqx'
---

# This is Blog

# 流程

## 初始化项目

```bash
npm init gatsby -- -y -ts
```

## 插件配置

> 插件地址： [https://www.gatsbyjs.com/plugins](https://www.gatsbyjs.com/plugins)

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

1. https://www.howtographql.com/basics/1-graphql-is-the-better-rest/
2. https://graphql.org/learn/schema/#union-types

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

## 引入 MDX

### 依赖安装

> https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=gatsby-plugin-mdx
> gatsby-source-filesystem 创建文件节点
> gatsby-plugin-mdx 将文件节点转化为 MDX 节点。为 GraphQL 查询提供了 allMdx 和 mdx 字段。

```bash
yarn add gatsby-source-filesystem gatsby-plugin-mdx @mdx-js/react -S
```

### 配置

```diff
module.exports = {
  plugins: [
+    `gatsby-plugin-mdx`,
+    {
+      resolve: `gatsby-source-filesystem`,
+      options: {
+        name: `pages`,
+        path: `${__dirname}/src/pages`,
+      },
+    },
  ],
}
```

![图片](https://static.hellochange.cn/images/blog/webpack-process.png)
![图片2](./icon.png)
