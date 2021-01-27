import {
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalOverlay,
    Link,
    ModalFooter,
    Text
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'

export default function AboutButton () {
    const { t } = useI18n()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>{t('about')}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('about')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{t('aboutText')}</Text>
                        <Text marginTop='10px'>{t('prefixText')}</Text>
                        <Text marginTop='10px'>
                            {t('ossText')}{' '}
                            <Link href='https://github.com/Weilbyte/TechSearchMK'>
                                GitHub.
                            </Link>
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>{t('close')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
