import { PageProps, graphql } from 'gatsby';
import React from 'react';

const FileInfo = (props: PageProps<Queries.FileInfoQuery>) => {
  console.log(Object.entries(props.data.file || {}));
  return (
    <div>
      file静态页面
      {props.data.file &&
        Object.entries(props.data.file).map(([key, value]) => (
          <p key={key}>
            {key}:{String(value)}
          </p>
        ))}
    </div>
  );
};

// props.pageContext的字段变成传参查询。 $id即props.pageContext.id作为参数
export const query = graphql`
  query FileInfo($id: String = "") {
    file(id: { eq: $id }) {
      root
      relativePath
      relativeDirectory
      rdev
      publicURL
      prettySize
      nlink
      name
      mtimeMs
      mtime
      modifiedTime
      mode
      childMdx {
        id
      }
      size
    }
  }
`;
export default FileInfo;
