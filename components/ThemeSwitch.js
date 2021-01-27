import { useColorMode, Button, Box, Tooltip } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Twemoji } from './'

export default function ThemeSwitch () {
    const { colorMode, toggleColorMode } = useColorMode()
    const { t } = useI18n()

    return (
        <div>
            <Tooltip
                label={colorMode == 'light' ? t('darkMode') : t('lightMode')}
                aria-label='Tooltip'
            >
                <Button onClick={toggleColorMode} title={t('themeToggle')}>
                    <Box hidden={colorMode == 'light'}>
                        <Twemoji emoji={String.fromCodePoint(0x1f31e)} />
                    </Box>
                    <Box hidden={colorMode == 'dark'}>
                        <Twemoji emoji={String.fromCodePoint(0x1f311)} />
                    </Box>
                </Button>
            </Tooltip>
        </div>
    )
}
