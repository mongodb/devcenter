import type { NextPage } from 'next';
import Image from 'next/future/image';
import { getURLPath } from '../utils/format-url-path';
import { Button, Link, TypographyScale } from '@mdb/flora';
import { NextSeo } from 'next-seo';

const NotFound: React.FunctionComponent<NextPage> = () => {
    return (
        <>
            <NextSeo title="Page not found" />
            <div
                sx={{
                    margin: ['24px', null, '48px', '96px', '120px'],
                    marginLeft: ['42px', null, null, null, '56px'],
                    display: 'flex',
                    gap: ['24px', null, null, null, '88px'],
                    flexDirection: ['column', null, null, 'row'],
                    alignItems: 'center',
                }}
            >
                <div
                    sx={{
                        position: 'relative',
                        width: ['226px', null, null, '468px', '515px'],
                        height: ['165px', null, null, '342px', '376px'],
                        flexShrink: 0,
                    }}
                >
                    <div
                        sx={{
                            width: ['162px', null, null, '332px', '365px'],
                            height: '100%',
                            position: 'relative',
                            left: [0, null, null, '6px', '60px'],
                        }}
                    >
                        <Image
                            src={
                                getURLPath('/404-backdrop.png', false) as string
                            }
                            fill
                            alt="404 backdrop"
                        />
                    </div>
                    <div
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: ['150px', null, null, '311px', '342px'],
                        }}
                    >
                        <Image
                            src={getURLPath('/404.png', false) as string}
                            fill
                            alt="404"
                        />
                    </div>
                </div>

                <div
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: ['center', null, null, 'start'],
                    }}
                >
                    <TypographyScale
                        variant="heading1"
                        customStyles={{
                            marginBottom: '32px',
                            lineHeight: '64px',
                            color: 'green70',
                            fontSize: ['100px', null, null, '128px'],
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
                    <div
                        sx={{
                            display: 'flex',
                            gap: '32px',
                            flexDirection: ['column', null, null, null, 'row'],
                        }}
                    >
                        <Button href={getURLPath('/')}>
                            MongoDB Developer Home
                        </Button>
                        <Link
                            target="_blank"
                            linkIcon="arrow"
                            href=" https://support.mongodb.com/"
                        >
                            Contact support
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
