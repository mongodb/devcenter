import { useState } from 'react';
import Image from 'next/image';
import { BrandedIcon } from '@mdb/flora';
import { ContentRatingProps } from './types';

const labelMap: { [index: number]: string } = {
    0: 'One Star',
    1: 'Two Stars',
    2: 'Three Stars',
    3: 'Four Stars',
    4: 'Five Stars',
};

const iconHeight = 28;
const iconPadding = 2;

const ContentRating: React.FunctionComponent<ContentRatingProps> = ({
    stars,
    onRate,
}) => {
    const [activeStarsCount, setActiveStarsCount] = useState(stars);

    return (
        <div
            sx={{
                display: 'flex',
                alignItems: 'center',
                mx: 'inc20',
            }}
        >
            {Array.from(Array(5).keys()).map(i => {
                return (
                    <div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={labelMap[i]}
                        sx={{
                            cursor: 'pointer',
                            width: 'inc30',
                            height: 'inc30',
                        }}
                        onMouseEnter={() => setActiveStarsCount(i + 1)}
                        onFocus={() => setActiveStarsCount(i + 1)}
                        onMouseLeave={() => setActiveStarsCount(stars)}
                        onBlur={() => setActiveStarsCount(stars)}
                        onClick={() => {
                            onRate(i + 1);
                        }}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                onRate(i + 1);
                            }
                        }}
                    >
                        {i < activeStarsCount ? (
                            <BrandedIcon
                                alt="star-filled"
                                name="general_action_star"
                                size="small"
                                customStyles={{
                                    width: iconHeight,
                                    height: iconHeight,
                                    padding: iconPadding,
                                }}
                            />
                        ) : (
                            <div sx={{ padding: iconPadding }}>
                                <Image
                                    alt="star-empty"
                                    src="/developer/rating-star.svg"
                                    width={iconHeight}
                                    height={iconHeight}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
export default ContentRating;
