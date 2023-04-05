import { getPlaiceholder } from "plaiceholder";
import Container from "../../components/container";
import Hero from "../../components/hero";
import Meta from "../../components/meta";
import Posts from "../../components/posts";
import { getAllPosts } from "../../lib/api";
import { eyecatchLocal } from "../../lib/constants";

const Blog = ({posts}) => {
  return (
    <Container>
      <Meta />
      <Hero title="Blog" subtitle="Recent Posts" />
      <Posts posts={posts} />
    </Container>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts();

  
  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url)
    post.eyecatch.blurDataURL = base64
  }


  return {
    props: {
      posts: posts,
    }
  };
};

export default Blog;
