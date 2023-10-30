import type { NextPage } from 'next';
import Image from 'next/future/image';
import { getURLPath } from '../utils/format-url-path';
import { Button, Link, TypographyScale } from '@mdb/flora';

const NotFound: React.FunctionComponent<NextPage> = () => {
    return (
        <main
            sx={{
                margin: ['24px', null, '48px', '96px', '192px'],
                marginLeft: ['42px', null, null, null, '56px'],
                display: 'flex',
                gap: ['24px', null, null, null, '88px'],
                flexDirection: ['column', null, null, 'row'],
            }}
        >
            <div
                sx={{
                    position: 'relative',
                    width: ['386px', null, null, null, '515px'],
                    height: ['257px', null, null, null, '342px'],
                    flexShrink: 0,
                }}
            >
                <div
                    sx={{
                        width: ['248px', null, null, null, '365px'],
                        height: ['248px', null, null, null, '365px'],
                        position: 'relative',
                    }}
                >
                    <Image
                        src={getURLPath('/404-backdrop.png', false) as string}
                        fill
                        alt="404 backdrop"
                    />
                </div>
                <div
                    sx={{
                        position: 'absolute',
                        top: ['28px', null, null, null, '42px'],
                        left: ['-42px', null, null, null, '-56px'],
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Image
                        src={getURLPath('/404.png', false) as string}
                        fill
                        alt="404"
                    />
                </div>
            </div>

            <div>
                <TypographyScale
                    variant="heading1"
                    customStyles={{
                        marginBottom: '32px',
                        lineHeight: '64px',
                        color: 'green70',
                    }}
                >
                    404
                </TypographyScale>
                <TypographyScale
                    variant="heading3"
                    customStyles={{ marginBottom: '32px' }}
                >
                    We couldn’t find this page
                </TypographyScale>
                <TypographyScale
                    variant="heading6"
                    customStyles={{ marginBottom: '56px' }}
                >
                    It might have been moved or deleted.
                </TypographyScale>
                <div sx={{ display: 'flex', gap: '32px' }}>
                    <Button href={getURLPath('/')}>
                        MongoDB Developer Home
                    </Button>
                    <Link target="_blank" linkIcon="arrow">
                        Contact support
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
