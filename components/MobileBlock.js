import { useEffect, useState } from 'react'
import { Center, HStack, VStack, Text } from '@chakra-ui/react'
import {
    Twemoji,
    LanguageSwitch,
    ThemeSwitch,
    AboutButton
} from '../components'
import { useI18n } from 'next-localization'

export default function MobileBlock ({ children }) {
    const { t } = useI18n()
    const [isMobile, setMobile] = useState(false)

    useEffect(() => {
        if (
            navigator.userAgent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
            )
        ) {
            setMobile(true)
        }
    })

    if (isMobile) {
        return (
            <Center style={{ height: '100%' }}>
                <VStack spacing={10}>
                    <HStack>
                        <AboutButton />
                        <LanguageSwitch />
                        <ThemeSwitch />
                    </HStack>
                    <div>
                        <Center marginBottom='15px'>
                            <Twemoji emoji={String.fromCodePoint(0x1f614)} />
                        </Center>
                        <Text>{t('noMobile')}</Text>
                    </div>
                </VStack>
            </Center>
        )
    } else {
        return <>{children}</>
    }
}
