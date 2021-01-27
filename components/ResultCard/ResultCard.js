import {
    Box,
    Image,
    Tooltip,
    Center,
    Spacer,
    Link,
    Text,
    Flex
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useI18n } from 'next-localization'

export default function ResultCard ({ data }) {
    const { t } = useI18n()
    const { locale } = useRouter()

    const getUrl = () => {
        switch (data.retailer) {
            case 'anhoch':
                return `https://www.anhoch.com/product/${data.id}`
            case 'setec':
                return `https://setec.mk/index.php?route=product/product&product_id=${data.id}`
        }
    }

    const getPrice = () => {
        if (locale == 'en-US') {
            return `\$${(data.price / 50.75).toFixed(0)}`
        } else {
            return `${data.price} ден.`
        }
    }

    return (
        <Box
            w='200px'
            h='360px'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
        >
            <Center h='200px' w='200px' backgroundColor='white'>
                <Image
                    src={data.image}
                    fallbackSrc='https://via.placeholder.com/200x200'
                    alignSelf='center'
                    fit='cover'
                />
            </Center>

            <Flex height='160px' p='2' flexDirection='column'>
                <Text color='gray.500'>{t(data.retailer)}</Text>
                <Tooltip label={data.name} openDelay={450}>
                    <Text
                        fontWeight='semibold'
                        isTruncated
                        noOfLines='3'
                        lineHeight='tight'
                        marginTop='5px'
                    >
                        <Link href={getUrl()}>{data.name}</Link>
                    </Text>
                </Tooltip>
                <Spacer />
                <Box marginBottom='10px'>
                    <Text>{getPrice()}</Text>
                </Box>
            </Flex>
        </Box>
    )
}
