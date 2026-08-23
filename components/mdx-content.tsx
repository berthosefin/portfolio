import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { JSX } from 'react'
import remarkGfm from 'remark-gfm'
import { highlight } from 'sugar-high'

function Code({ children, ...props }: any) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

const components = {
  code: Code
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm]
        }
      }}
    />
  )
}
