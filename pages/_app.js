import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { I18nProvider } from 'next-localization'

import '../styles/global.sass'
import { AppLayout, A11yHelper, MobileBlock } from '../components'

export default function MyApp ({ Component, pageProps }) {
    const router = useRouter()
    const { lngDict, ...rest } = pageProps

    return (
        <>
            <title>TechSearchMK</title>
            <A11yHelper />
            <I18nProvider lngDict={lngDict} locale={router.locale}>
                <ChakraProvider>
                    <MobileBlock>
                        <AppLayout>
                            <Component {...pageProps} />{' '}
                        </AppLayout>
                    </MobileBlock>
                </ChakraProvider>
            </I18nProvider>
        </>
    )
}
