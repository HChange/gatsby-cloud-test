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

> export const query 的查询结果会当作当前 export 组件的 props.data 传入

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

### MDX 文件导入 jsx 文件

> jsx 文件可以直接 import src/content 中的 mdx 文件

1. 配置 gatsby-config.mjs

```diff
  plugins: [
    // Your other plugins...
+    {
+      resolve: `gatsby-source-filesystem`,
+      options: {
+        name: `content`,
+        path: `./src/content`,
+      },
+    },
  ]
```

## 扩展 `gatsby-plugin-mdx` 功能

> gatsby-remark-images 优化图片生成响应图像
> gatsby-remark-prismjs 引入 prismjs mdx 页面添加样式
> gatsby-remark-autolink-header 给 header 添加锚点
> remark-gfm 增强 mdx 识别的语法

### 安装

```bash
yarn add gatsby-remark-images gatsby-remark-prismjs gatsby-remark-autolink-header prismjs remark-gfm -S
```

### 配置

> 因为 remark-gfm 最新版本只能使用 esm，所以该处将`gatsby-config.ts`==> `gatsby-config.mjs`

```diff
+ import G from 'remark-gfm';

const config =  {
  plugins: [
-  `gatsby-plugin-mdx`,
+   {
+      resolve: `gatsby-plugin-mdx`,
+      options: {
+        mdxOptions: {
+          remarkPlugins: [G],
+        },
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
export default config;
```

新建`gatsby-browser.js`文件，引入样式

```js
require('prismjs/themes/prism.min.css');
```

## 动态创建页面

> 语法: `{nodeType.field}`

### 新建一个动态路由规则

在`src/pages`下新增`{mdx.frontmatter__router}.tsx`文件，gatsby 将自动为`frontmatter`含有`router`字段的`.mdx、.md`文件创建路由。路由地址为`basepath/mdx.frontmatter__router`。

### 为动态路由匹配的页面注入数据

```tsx
import { graphql } from 'gatsby';
import React from 'react';

const Status = (props: any) => {
  console.log(props);
  return (
    <div>
      静态页面<div>{props.children}</div>
    </div>
  );
};

// props.pageContext的数据变成传参查询。 如下面请求$frontmatter__router即props.pageContext.frontmatter__router作为参数。一般使用$id进行查询
export const query = graphql`
  query MyQuery($frontmatter__router: String = "") {
    mdx(frontmatter: { router: { eq: $frontmatter__router } }) {
      id
      frontmatter {
        name
        creator
        time
        slug
        router
        date
      }
    }
  }
`;
export default Status;
```

## MDX banner 图引入以及优化

> 使用 gatsby-transformer-sharp 将所有图像 File 节点添加一个 childImageSharp 节点

需要导入 banner 的文件

```mdx
---
hero_image: './icon.png'
hero_image_alt: '图片1'
router: 'img1'
---
```

{mdx.frontmatter\_\_touter}.tsx 文件

```tsx
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

const Status = (props: any) => {
  console.log(props);
  const { data } = props;
  // 等价于：data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData
  const image = getImage(data.mdx.frontmatter.hero_image);

  return (
    <div>
      <div>{image && <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />}</div>
      mdx静态页面<div>{props.children}</div>
    </div>
  );
};

// props.pageContext的字段变成传参查询。 $frontmatter__router即props.pageContext.pageContext作为参数
export const query = graphql`
  query MyQuery($frontmatter__router: String = "") {
    mdx(frontmatter: { router: { eq: $frontmatter__router } }) {
      id
      frontmatter {
        name
        creator
        time
        slug
        router
        date
        hero_image_alt
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;
export default Status;
```

## 简单构建插件

### 创建 node（sourceNode）

1. 导出 `sourceNodes`
2. 创建 id `createNodeId`
3. 创建 node `actions.createNode`

### 创建映射

> 创建 node 时会自动推断类型但是可能不并不准确

1. 导出 `createSchemaCustomization`
2. 创建类型 `actions.createTypes`

### 参数校验

1. 导出 `pluginOptionsSchema`
2. return Joi.object({
   endpoint: Joi.string()
   .uri()
   .required()
   .description(`The endpoint of your GraphQL API`),
   })

### 初始化

1. 导出 `onPluginInit`

## 项目配置

### 环境变量配置

> 使用 .env 以及 .env.xxx 配置环境变量

1. 新建`.env`、`.env.development`

```test .env
API_KEY = .env运行时可以看到的API_KEY
GATSBY_API_KEY = 浏览器可以看到的API_KEY
```

```test .env.development
API_KEY = .env.development运行时可以看到的API_KEY
```

2. 引入配置

> gatsby-config.mjs 文件, 此时.env 可以配置公共的配置。.env.xxx 可以配置私人配置

```diff
+ import dotenv from 'dotenv';

+ dotenv.config({
+  path: `.env.${process.env.NODE_ENV}`,
+ });
+ dotenv.config({
+  path: '.env',
+ });
```

3. 使用

node 运行环境：`process.env.API_KEY`
浏览器环境：必须使用`GATSBY_` 修饰，`process.env.GATSBY_API_KEY`

### 自动生成 graphql 数据类型

1. gatsby-config 启用

```diff
const config = {
 ...
+  graphqlTypegen: { typesOutputPath: `gatsby-types.d.ts` },
 ...
}
```

### Router 配置

1. src/pages/xxx 文件，自动创建 xxx 路由

2. 使用文件系统路由，即上文提到的 `{mdx.frontmatter__router}.tsx`

3. createPages

```ts gatsby-node.ts
export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { data } = await graphql<any>(`
    query AllMdxQuery {
      allMdx {
        nodes {
          frontmatter {
            router
          }
        }
      }
    }
  `);

  // console.dir(data);
  data?.allMdx?.nodes?.forEach((item: any) => {
    const router = item.frontmatter?.router;
    router &&
      createPage({
        // 路由
        path: `/layout/${router}`,
        // 渲染的页面
        component: resolve('./src/components/Layout/query.tsx'),
        // 传递给component的pageContext，可作为grahpl的筛选条件
        context: { router },
      });
  });
};
```

## 添加 layout

### `.tsx` 页面

直接使用 layout 包裹

### `.mdx`、`.md`文件

gatsby-node

```ts
export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data } = await graphql<any>(`
    query AllMdxQuery {
      allMdx {
        nodes {
          id
          frontmatter {
            router
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  // console.dir(data);
  data?.allMdx?.nodes?.forEach((item: any) => {
    const router = item.frontmatter?.router;
    router &&
      createPage({
        path: `/layout/${router}`,
        // 如果是： node.internal.contentFilePath 直接渲染。如果是 __contentFilePath 则当作children传入到Layout
        component: `${resolve('./src/components/Layout/query.tsx')}?__contentFilePath=${item.internal.contentFilePath}`,
        context: { router },
      });
  });
};
```

## 样式

### 引入 less

1. 安装`gatsby-plugin-less`

2. 配置

```diff
 plugins: [
+  {
+    resolve: `gatsby-plugin-less`,
+    // https://github.com/webpack-contrib/css-loader
+    options: {
+      cssLoaderOptions: {
+        camelCase: false,
+      },
+
+        modules: {
+          mode: 'global',
+        },
+      },
+    },
 ]
```

### 引入 Tailwind

> https://tailwindcss.com/docs/guides/gatsby

1. 安装

```bash
npm install -D tailwindcss postcss autoprefixer gatsby-plugin-postcss
```

2. 初始化

> 创建`postcss.config.js`和`tailwind.config.js`

```bash
npx tailwindcss init -p
```

3. 配置 gatsby-config

```diff
plugins: [
+    'gatsby-plugin-postcss',
    // ...
],
```

4. 配置模板路径

> 哪些页面需要用到 tailwind

```js tailwind.config
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

5. 将 Tailwind 指令添加添加到 css

> 引入一些默认样式

```css globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. 将全局样式导出

```js gatsby-browser.ts
import './globals.css';
```

## 引入字体

### 本地字体

1. 新建`gatsby-ssr.tsx`

```tsx
import { GatsbySSR } from 'gatsby';
import React from 'react';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  return setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Inter-roman.var.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interFont"
    />,
  ]);
};
```

2. 全局样式引入

```diff globals.css
@font-face {
  font-family: 'Inter var';
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
  font-named-instance: 'Regular';
  src: url(/fonts/Inter-roman.var.woff2) format("woff2");
}
```

### 网络字体

> 本文使用 google 字体

1. 安装依赖

```bash
yarn add gatsby-omni-font-loader react-helmet
```

2. 配置 gatsby-config

```ts
Copygatsby-config.js: copy code to clipboard
 export const config =  {
  plugins: [
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Inter`,
            file: `https://fonts.googleapis.com/css2?family=Inter&display=swap`,
          },
        ],
      },
    },
  ]
}
```

3. 全局引用

```css
.Inter {
  font-family: 'Inter';
}
```

## 静态目录
