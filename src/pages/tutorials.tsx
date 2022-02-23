import { NextPage } from 'next';
import { CONTENT_CATEGORIES } from '../constants/content-categories';
import { PillCategory } from '../types/pill-category';
import getL1Content from '../requests/get-l1-content';
import { CardContent } from '../interfaces/card-content';
import SharedCard from '../components/cards/sharedcard/shared-card';
import React from 'react';

const Tutorials: NextPage = () => (
    <>
        <h1>Tutorials</h1>
        <div>SLIDER CARDS</div>
        <div
            style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
            }}
        >
            {CONTENT_CATEGORIES.map((category: PillCategory) =>
                getL1Content()
                    .filter(
                        (result: CardContent) =>
                            result.pillCategory === category
                    )
                    .map((result: CardContent) => (
                        <SharedCard
                            key={result.title}
                            pillCategory={result.pillCategory}
                            thumbnail={result.thumbnail}
                            title={result.title}
                            description={result.description}
                            contentDate={result.contentDate}
                        />
                    ))
            )}
        </div>
    </>
);

export default Tutorials;
