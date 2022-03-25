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
    onRate,
}) => {
    const [activeStarsCount, setActiveStarsCount] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);

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
                        onMouseLeave={() => setActiveStarsCount(selectedStars)}
                        onBlur={() => setActiveStarsCount(selectedStars)}
                        onClick={() => {
                            setSelectedStars(i + 1);
                            onRate(i + 1);
                        }}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                setSelectedStars(i + 1);
                                onRate(i + 1);
                            }
                        }}
                    >
                        {i < activeStarsCount ? (
                            <BrandedIcon
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
                                    src="/rating-star.svg"
                                    width={iconHeight}
                                    height={iconHeight}
                                ></Image>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
export default ContentRating;
