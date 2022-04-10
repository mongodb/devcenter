// import React from 'react';
// import {Podcast} from "../interfaces/podcast";
// import {GetStaticProps, NextPage} from "next";
// import {getArticles, getPodcasts} from "../service/get-all-content";
// import {Video} from "../interfaces/video";
// import {Article} from "../interfaces/article";
//
//
// interface Props {
//     podcasts?: Podcast[];
//     videos?: Video[];
//     articles?: Article[];
// }
//
// const Articles: NextPage<Props> = ({podcasts, videos, articles}) => (
//     <>
//         <h1>MongoDB Developer Center</h1>
//         <h2>Articles</h2>
//         {/*<ul>*/}
//         {/*    {podcasts?.map(a => (*/}
//         {/*        <li key={a.slug}>*/}
//         {/*            <h3>{a.title}</h3>*/}
//         {/*            <p>{a.description}</p>*/}
//         {/*            <p>{a.slug}</p>*/}
//         {/*            <p>{a.publishDate}</p>*/}
//         {/*            <p>{a.podcastFileUrl}</p>*/}
//         {/*            <p>{a.thumbnailUrl}</p>*/}
//         {/*        </li>*/}
//         {/*    ))}*/}
//         {/*</ul>*/}
//         {/*<ul>*/}
//         {/*    {articles?.map(a => (*/}
//         {/*        <li key={a.slug}>*/}
//         {/*            <h3>{a.title}</h3>*/}
//         {/*            <p>{a.description}</p>*/}
//         {/*            <p>{a.slug}</p>*/}
//         {/*            <p>{a.publishDate}</p>*/}
//         {/*            <p>{a.thumbnailUrl}</p>*/}
//         {/*            {a.authors.map( a => {*/}
//         {/*                return <p>{a.name}</p>*/}
//         {/*            })}*/}
//
//         {/*        </li>*/}
//         {/*    ))}*/}
//         {/*</ul>*/}
//
//     </>
// );
//
// export const getStaticProps: GetStaticProps = async ({}) => {
//     // const podcasts = await getPodcasts();
//     // return {
//     //     props: { podcasts },
//     // };
//     // const videos = await getVideos();
//     const articles = await getArticles()
//     return {
//         props: {articles},
//     };
//
// };
//
// export default Articles;

import { NextPage } from 'next';

const Articles: NextPage = () => (
    <>
        <h1>Articles</h1>
    </>
);

export default Articles;
