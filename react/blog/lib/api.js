// https://blog.microcms.io/microcms-next-jamstack-blog/
// https://circleci.com/ja/blog/what-is-sdk/#:~:text=SDK%E3%81%A8%E3%81%AF%E3%80%8CSoftware%20Development,%E3%82%82%E3%81%AE%E3%81%8C%E5%90%AB%E3%81%BE%E3%82%8C%E3%81%BE%E3%81%99%E3%80%82
import { createClient } from "microcms-js-sdk";

// SDKの初期化
export const client = createClient({
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY,
});

export async function getPostBySlug(slug) {
    try {
        const post = await client.get({
            // endpointを指定して、作成したAPIのデータを取得する
            endpoint: "blogs",
            // equals：https://blog.microcms.io/filters-parameter
            // APIに設定した対象の名前[equals]${変数slug}
            queries: { filters: `slug[equals]${slug}` },
        });
        return post.contents[0];
    } catch (err) {
        console.log("~~ getPostBySlug ~~");
        console.log(err);
    }
}

export async function getAllSlugs(limit = 100) {
    try {
        const slugs = await client.get({
            endpoint: "blogs",
            queries: {
                // https://document.microcms.io/content-api/get-list-contents#h929d25d495
                fields: "title,slug",
                orders: "-publishDate",
                limit: limit,
            },
        });
        return slugs.contents;
    } catch (err) {
        console.log("~~ getAllSlugs ~~");
        console.log(err);
    }
}

export async function getAllPosts(limit = 100) {
    try {
        const posts = await client.get({
            endpoint: "blogs",
            queries: {
                fields: "title,slug,eyecatch",
                orders: "-publishDate",
                limit: limit,
            },
        });
        return posts.contents;
    } catch (err) {
        console.log("~~ getAllPosts ~~");
        console.log(err);
    }
}

export async function getAllCategories(limit = 100) {
    try {
        const categories = await client.get({
            endpoint: "categories",
            queries: { fields: "name,id,slug", limit: limit },
        });
        return categories.contents;
    } catch (err) {
        console.log("~~ getAllCategories ~~");
        console.log(err);
    }
}

export async function getAllPostsByCategory(catID, limit = 100) {
    try {
        const posts = await client.get({
            endpoint: "blogs",
            queries: {
                filters: `categories[contains]${catID}`,
                fields: "title,slug,eyecatch",
                orders: "-publishDate",
                limit: limit,
            },
        });
        return posts.contents;
    } catch (err) {
        console.log("~~ getAllPostsByCategory ~~");
        console.log(err);
    }
}
