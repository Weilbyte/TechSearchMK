import { Flex, Spacer, Link, Stack, Heading, Box } from '@chakra-ui/react'

import styles from './Layout.module.sass'

import { LanguageSwitch, ThemeSwitch, Twemoji, AboutButton } from '../'

function Header () {
    return (
        <Flex className={styles.header} alignItems='center'>
            <Heading>TechSearchMK</Heading>
            <Spacer />
            <Stack direction='row'>
                <AboutButton />
                <LanguageSwitch />
                <ThemeSwitch />
            </Stack>
        </Flex>
    )
}

function Footer () {
    return (
        <Box className={styles.footer}>
            <Link href='https://github.com/weilbyte'>Weilbyte</Link>{' '}
            <Twemoji emoji={String.fromCodePoint(0x1f98a)} />{' '}
            {new Date().getFullYear()}
        </Box>
    )
}

export default function AppLayout (props) {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.content}>{props.children}</div>
            <Footer />
        </div>
    )
}
