import Head from "next/head";
import { useRouter } from "next/router";

import { siteMeta } from "lib/constants";
const { siteTitle, siteDesc, siteUrl, siteLocale, siteType, siteIcon } =
    siteMeta;

import siteImg from "images/ogp.jpg";

export default function Meta({
    pageTitle,
    pageDesc,
    pageImg,
    pageImgW,
    pageImgH,
}) {
    const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;

    const desc = pageDesc ?? siteDesc;

    const router = useRouter();
    // https://nextjs.org/docs/api-reference/next/router#router-object
    const url = `${siteUrl}${router.asPath}`;

    // OGP画像
    const img = pageImg || siteImg.src;
    const imgW = pageImgW || siteImg.width;
    const imgH = pageImgH || siteImg.height;
    // startsWith：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
    const imgUrl = img.startsWith("https") ? img : `${siteUrl}${img}`;

    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title}></meta>
            <meta name="description" content={desc}></meta>
            <meta property="og:description" content={desc}></meta>
            <link rel="canonical" href={url}></link>
            <meta property="og:url" content={url}></meta>
            <meta property="og:site_name" content={siteTitle}></meta>
            <meta property="og:type" content={siteType}></meta>
            <meta property="og:locale" content={siteLocale}></meta>
            <link rel="icon" href={siteIcon}></link>
            <link rel="apple-touch-icon" href={siteIcon}></link>

            <meta property="og:image" content={imgUrl} />
            <meta property="og:image:width" content={imgW} />
            <meta property="og:image:height" content={imgH} />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
}
