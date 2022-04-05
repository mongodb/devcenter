import { TypographyScale, Button, TextArea, TextInput } from '@mdb/flora';

import { TextRequestProps } from '../types';
import { modalWrapperStyles } from '../styles';
import { useState } from 'react';

const helperText =
    "Please include which products, languages, and technologies you're interested in seeing as part of this content request";

const TextRequest: React.FunctionComponent<TextRequestProps> = ({
    onContinue,
    contentCategory,
}) => {
    const title = `Request ${
        /^[aeiou]/gi.test(contentCategory) ? 'an' : 'a'
    } ${contentCategory}`; // Regex to tell if it starts with a vowel.

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');

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
                        width: '100%',
                    },
                    marginBottom: 'inc30',
                }}
            >
                <TextInput
                    name="topic"
                    label="Topic"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                />
            </div>

            <div sx={{ marginBottom: 'inc30' }}>
                <TextArea
                    name="description"
                    label="Describe your experience"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    helper={helperText}
                    textAreaStyles={{ resize: 'vertical' }}
                />
            </div>
            <div
                sx={{
                    '& > div': {
                        width: '100%',
                    },
                    marginBottom: ['inc40', null, null, 'inc50'],
                }}
            >
                <TextInput
                    name="email"
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={() => onContinue(topic, description, email)}
                    size="small"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default TextRequest;
