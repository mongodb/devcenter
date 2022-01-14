import type { NextPage } from 'next';
import type { GetStaticProps, GetStaticPaths } from 'next';
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
    <Grid>
        <GridColumn desktopColumns={5}>
            <Placeholder color="red">{slug}</Placeholder>
        </GridColumn>
        <GridColumn desktopColumns={7}>
            <Placeholder color="blue">{slug}</Placeholder>
        </GridColumn>
        <GridColumn desktopColumns={7}>
            <Placeholder color="red">{slug}</Placeholder>
        </GridColumn>
        <GridColumn desktopColumns={5}>
            <Placeholder color="blue">{slug}</Placeholder>
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
            params: { slug: 'topic1' },
        },
        {
            params: { slug: 'topic2' },
        },
    ];
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    return { props: { slug } };
};
