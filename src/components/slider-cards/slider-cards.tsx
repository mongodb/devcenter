import React from 'react';
import { CardContent } from '../../interfaces/cardContent';
import { CONTENT_CATEGORIES } from '../../data/content-category';
import SharedCard from '../cards/shared-card';
import { PillCategory } from '../../types/pill-category';
import { SliderCardStyle } from './styles';

interface IProps {
    data: CardContent[];
}

interface IProps2 {
    rowData: CardContent[];
    rowType: PillCategory;
}

interface IProps3 {
    rowType: PillCategory;
}

const SliderContent = ({ data }: IProps) => {
    return (
        /*
        This should render a grid according to the grid layout break points
        large : 3 columns
        */
        <div sx={SliderCardStyle}>
            {data.map((d: CardContent) => (
                <SharedCard
                    key={d.title}
                    pillCategory={d.pillCategory}
                    thumbnail={d.thumbnail}
                    title={d.title}
                    description={d.description}
                    contentDate={d.contentDate}
                />
            ))}
        </div>
    );
};

const SliderHeader = (props: IProps3) => {
    return <div>{props.rowType}</div>;
};

const SliderRow = ({ rowData, rowType }: IProps2) => {
    /*
    This should check if the row data is more than 3 articles and display if true
    also each row fill follow grid sizing from flora
     */
    return (
        // <SliderHeader rowType={rowType}/>
        <SliderContent data={rowData} />
    );
};

const SliderCards: React.FunctionComponent<IProps> = ({ data }: IProps) => {
    return (
        <>
            {CONTENT_CATEGORIES.map((category: PillCategory) => (
                <SliderRow
                    key={category}
                    rowData={data.filter(d => d.pillCategory === category)}
                    rowType={category}
                />
            ))}
        </>
    );
};

export default SliderCards;
