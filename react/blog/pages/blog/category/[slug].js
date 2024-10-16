import { getAllCategories, getAllPostsByCategory } from "lib/api";
import Meta from "components/meta";
import Container from "components/container";
import PostHeader from "components/post-header";
import Posts from "components/posts";
import { getPlaiceholder } from "plaiceholder";
import { eyecatchLocal } from "lib/constants";

export default function Category({ name, posts }) {
    return (
        <Container>
            <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
            <PostHeader title={name} subtitle="Blog Category" />
            <Posts posts={posts} />
        </Container>
    );
}

export async function getStaticPaths() {
    const allCats = await getAllCategories();

    return {
        paths: allCats.map(({ slug }) => `/blog/category/${slug}`),
        // paths(params)をgetStaticPropsの引数（context）へ渡す
        fallback: false,
    };
}

export async function getStaticProps(context) {
    // context：生成されたページのパスを取得
    const catSlug = context.params.slug;

    const allCats = await getAllCategories();
    const cat = allCats.find(({ slug }) => slug === catSlug);

    const posts = await getAllPostsByCategory(cat.id);

    for (const post of posts) {
        if (!post.hasOwnProperty("eyecatch")) {
            post.eyecatch = eyecatchLocal;
        }
        const { base64 } = await getPlaiceholder(post.eyecatch.url);
        post.eyecatch.blurDataURL = base64;
    }

    return {
        props: {
            name: cat.name,
            posts: posts,
        },
    };
}
