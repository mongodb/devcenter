import React from 'react';
import { NextPage } from 'next';
import { CardContent } from '../interfaces/card-content';
import { PillCategory } from '../types/pill-category';
import getL1Content from '../requests/get-l1-content';
import { CONTENT_CATEGORIES } from '../constants/content-categories';
import FeatureCard from '../components/cards/featurecard/featured-card';

const Articles: NextPage = () => (
    <>
        <div>FEATURED JUMBO CARDS</div>
        <div>
            {CONTENT_CATEGORIES.map((category: PillCategory) =>
                getL1Content()
                    .filter(
                        (result: CardContent) =>
                            result.pillCategory === category
                    )
                    .map((result: CardContent) => (
                        <div key={result.title}>
                            <FeatureCard
                                key={result.title}
                                pillCategory={result.pillCategory}
                                thumbnail={result.thumbnail}
                                title={result.title}
                                description={result.description}
                                tags={result.tags}
                                contentDate={result.contentDate}
                            />
                        </div>
                    ))
            )}
        </div>
    </>
);

export default Articles;
