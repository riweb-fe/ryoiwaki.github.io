// https://www.npmjs.com/package/html-react-parser
import parse from "html-react-parser";
import Image from "next/legacy/image";

export default function ConvertBody({ contentHTML }) {
    const contentReact = parse(contentHTML, {
        replace: (node) => {
            // .name：contentHTMLで使用されている要素を取得
            // .attribs：contentHTMLで使用されている属性値
            if (node.name === "img") {
                const { src, alt, width, height } = node.attribs;
                return (
                    <Image
                        layout="responsive"
                        src={src}
                        width={width}
                        height={height}
                        alt={alt}
                        sizes="(min-width: 768px) 768px, 100vw"
                    />
                );
            }
        },
    });
    return <>{contentReact}</>;
}
