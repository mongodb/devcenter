import { TypographyScale } from '@mdb/flora';

import { ResultsProps } from './types';
import { dataStyles } from './styles';

const Results: React.FunctionComponent<ResultsProps> = ({
    data,
    isLoading,
    hasError,
}) => {
    return (
        <div sx={dataStyles}>
            {data &&
                data.map(page =>
                    page.map(piece => (
                        <div sx={{ width: '100%' }} key={piece.name}>
                            <TypographyScale variant="heading6">
                                {piece.name}
                            </TypographyScale>
                            <TypographyScale variant="body2">
                                {piece.description}
                            </TypographyScale>
                        </div>
                    ))
                )}
            {isLoading ? (
                <div>Loading...</div>
            ) : hasError ? (
                <div>Something went wrong, please try again</div>
            ) : null}
        </div>
    );
};

export default Results;
