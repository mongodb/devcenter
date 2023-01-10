import { useState } from 'react';
import { TypographyScale, Button, TextArea, TextInput } from '@mdb/flora';

import { TextRequestProps } from '../types';
import { modalWrapperStyles } from '../../shared/styles';

import { getRequestBtnText } from '../../../../utils/page-template-helpers';

const helperText =
    "Please include which products, languages, and technologies you're interested in seeing as part of this content request";

const TextRequest: React.FunctionComponent<TextRequestProps> = ({
    onContinue,
    contentCategory,
}) => {
    const title = getRequestBtnText(contentCategory);

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');

    const [topicTyped, setTopicTyped] = useState(false);
    const [descTyped, setDescTyped] = useState(false);

    return (
        <div sx={modalWrapperStyles}>
            <TypographyScale
                variant="heading5"
                sx={{
                    display: 'block',
                    marginBottom: ['inc40', null, null, 'inc50'],
                }}
            >
                {title}
            </TypographyScale>
            <div
                sx={{
                    '& > div': {
                        maxWidth: '100%',
                    },
                    marginBottom: 'inc30',
                    maxWidth: '100%',
                }}
            >
                <TextInput
                    name="topic"
                    label="Topic"
                    value={topic}
                    onChange={e => {
                        setTopic(e.target.value);
                        setTopicTyped(true);
                    }}
                    invalid={!topic && topicTyped}
                />
            </div>
            <div sx={{ marginBottom: 'inc30' }}>
                <TextArea
                    name="description"
                    label="Describe your experience"
                    value={description}
                    onChange={e => {
                        setDescription(e.target.value);
                        setDescTyped(true);
                    }}
                    helper={helperText}
                    textAreaStyles={{ resize: 'vertical' }}
                    invalid={!description && descTyped}
                />
            </div>
            <div
                sx={{
                    '& > div': {
                        maxWidth: '100%',
                    },
                    marginBottom: ['inc40', null, null, 'inc50'],
                }}
            >
                <TextInput
                    name="email"
                    label="Email (optional)"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={() => {
                        if (topic && description) {
                            onContinue(topic, description, email);
                        } else {
                            setTopicTyped(true);
                            setDescTyped(true);
                        }
                    }}
                    size="small"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default TextRequest;
