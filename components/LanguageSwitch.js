import { useEffect } from 'react'
import { Button, Box, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useI18n } from 'next-localization'

import { Twemoji } from './'

export default function LanguageSwitch () {
    const { locale, route, push } = useRouter()
    const i18n = useI18n()

    useEffect(() => {
        if (localStorage !== typeof undefined) {
            const storedLocale = localStorage.getItem('LANG') || locale
            if (storedLocale !== locale) {
                push(route, route, { locale: storedLocale, shallow: false })
            }
        }

        i18n.set(locale, require(`../locales/${locale}.json`))
    })

    const toggleLanguage = () => {
        const language = locale == 'en-US' ? 'mk' : 'en-US'
        localStorage.setItem('LANG', language)
        push(route, route, { locale: language })
    }

    return (
        <Tooltip
            label={locale == 'en-US' ? 'Македонски' : 'English'}
            aria-label='Tooltip'
        >
            <Button
                onClick={toggleLanguage}
                title={
                    locale == 'en-US'
                        ? 'Промена на Македонски јазик'
                        : 'Change to English language'
                }
            >
                <Box hidden={locale == 'mk'}>
                    <Twemoji emoji='🇲🇰' />
                </Box>
                <Box hidden={locale == 'en-US'}>
                    <Twemoji emoji='🇬🇧' />
                </Box>
            </Button>
        </Tooltip>
    )
}
