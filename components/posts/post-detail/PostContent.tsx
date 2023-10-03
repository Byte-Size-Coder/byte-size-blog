import ReactMarkdown from "react-markdown";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

import Image from "next/image";
import PostHeader from "./PostHeader";

import classes from "./PostContent.module.css";
import { IPost } from "@/models/Posts";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("ts", ts);

interface IPostContentProps {
  post: IPost;
}

const PostContent: React.FC<IPostContentProps> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        console.log(image);
        const info = image.properties.alt.split("|");
        console.log(info);
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={info[0]}
              width={parseInt(info[1])}
              height={parseInt(info[2])}
            />
          </div>
        );
      }

      if (node.children[0].tagName === "a") {
        return (
          <p style={{ display: "flex", justifyContent: "center" }}>
            {paragraph.children}
          </p>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(code: any) {
      const { className, children } = code;
      const language = className.split("-")[1];
      return (
        <SyntaxHighlighter
          language={language}
          children={children}
          style={atomDark}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
