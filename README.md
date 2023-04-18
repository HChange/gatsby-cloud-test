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
