import Container from "../../components/container";
import { getAllSlugs, getPostBySlug } from "../../lib/api";
import PostHeader from "../../components/post-header";
import Image from "next/image";
import PostBody from "components/post-body";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "components/two-column";
import ConvertBody from "../../components/convert-body";
import PostCategories from "../../components/post-categories";
import { extractText } from "lib/extract-text";
import Meta from "components/meta";
import { eyecatchLocal } from "../../lib/constants";
import { getPlaiceholder } from "plaiceholder";
import { pervNextPost } from "../../lib/prev-next-post";
import Pagination from "../../components/pagination";

const Post = ({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
}) => {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />
        <figure>
          <Image
            key={eyecatch.url}
            src={eyecatch.url}
            alt=""
            layout="responsive"
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px)1152px, 100vw"
            priority
            placeholder="blur"
            blurDataURL={eyecatch.blurDataURL}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
        <Pagination
          prevText={prevPost.title}
          prevUrl={prevPost.slug}
          nextText={nextPost.title}
          nextUrl={nextPost.slug}
        />
      </article>
    </Container>
  );
};

export const getStaticPaths = async () => {
  const allSlugs = await getAllSlugs();
  // console.log(allSlugs)

  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const post = await getPostBySlug(slug);

  const description = extractText(post.content);
  const eyecatch = post.eyecatch ?? eyecatchLocal;

  const { base64 } = await getPlaiceholder(eyecatch.url);
  eyecatch.blurDataURL = base64;

  const allSlugs = await getAllSlugs();
  const [prevPost, nextPost] = pervNextPost(allSlugs, slug);

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: eyecatch,
      categories: post.categories,
      description: description,
      prevPost: prevPost,
      nextPost: nextPost,
    },
  };
};

export default Post;
