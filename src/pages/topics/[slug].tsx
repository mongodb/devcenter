import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styled from '@emotion/styled'; // TEMPORARY

import Grid, { GridColumn } from '../../components/grid';

////////////////////////////////////////////////////////////////////////
//////////////////////////////TEMPORARY/////////////////////////////////
interface placeholder {
    color?: string;
    height?: string;
    width?: string;
}

const Placeholder = styled.div<placeholder>`
    background-color: ${props => (props.color ? props.color : '#ccc')};
    max-width: 100%;
    overflow: hidden;
    height: ${props => (props.height ? props.height : '100')}px;
    width: ${props => (props.width ? props.width : '1400')}px;
`;

////////////////////////////////////////////////////////////////////////
interface HomeProps {
    slug: string;
}

const Topic: NextPage<HomeProps> = ({ slug }) => (
    <Grid rowGutter={12}>
        {/* TITLE **/}
        <GridColumn desktopColumns={12}>
            <Placeholder color="red" height="200" />
        </GridColumn>
        {/* SIDE NAV **/}
        <GridColumn desktopColumns={3} desktopRows={7}>
            <Placeholder color="blue" height="1000" />
        </GridColumn>
        {/* L2 TOPICS **/}
        <GridColumn desktopColumns={9}>
            <Placeholder color="green" height="300" />
        </GridColumn>
        {/* FEATURED **/}
        <GridColumn desktopColumns={9}>
            <Placeholder color="yellow" height="500" />
        </GridColumn>
        {/* ARTICLES **/}
        <GridColumn desktopColumns={9}>
            <Placeholder color="purple" height="300" />
        </GridColumn>
        {/* DEMO APPS **/}
        <GridColumn desktopColumns={9}>
            <Placeholder color="pink" height="300" />
        </GridColumn>
        {/* TUTORIALS **/}
        <GridColumn desktopColumns={9}>
            <Placeholder color="white" height="300" />
        </GridColumn>
        {/* PODCASTS **/}
        <GridColumn desktopColumns={3}>
            <Placeholder color="brown" height="500" />
        </GridColumn>
        {/* YOUTUBE **/}
        <GridColumn desktopColumns={3}>
            <Placeholder color="brown" height="500" />
        </GridColumn>
        {/* TWITCH **/}
        <GridColumn desktopColumns={3}>
            <Placeholder color="brown" height="500" />
        </GridColumn>
    </Grid>
);

export default Topic;

interface IParams extends ParsedUrlQuery {
    slug: string;
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [
        {
            params: { slug: 'L1' },
        },
    ];
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    return { props: { slug } };
};
