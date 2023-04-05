import Hero from "components/hero";
import { getPlaiceholder } from "plaiceholder";
import Container from "../components/container";
import Meta from "../components/meta";
import Pagination from "../components/pagination";
import Posts from "../components/posts";
import { getAllPosts } from "../lib/api";
import { eyecatchLocal } from "../lib/constants";

const Home = ({ posts }) => {
  return (
    <Container>
      <Meta pageTitle="ブログ" />
      <Hero title="CUBE" subtitle="アウトプットしていくサイト" imageOn />
      <Posts posts={posts} />
      <Pagination nextUrl="/blog" nextText="More Posts" />
    </Container>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts(4);

  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url);
    post.eyecatch.blurDataURL = base64;
  }
  return {
    props: {
      posts: posts,
    },
  };
};
export default Home;
