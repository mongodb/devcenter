import { Lightbox } from '@mdb/flora';
import { useModalContext } from '../../contexts/modal';

const Modal = () => {
    const { component, props, closeModal } = useModalContext();

    const onModalDismiss = () => {
        if (props?.onCloseCallback) {
            props.onCloseCallback();
        }

        closeModal();
    };

    return (
        <Lightbox
            isOpen={!!component}
            onClose={onModalDismiss}
            sx={{
                '> div': { height: 'unset' },
                ...(props?.hideCloseBtn && {
                    'button[aria-label="lightbox-close"]': {
                        display: 'none',
                    },
                }),
            }}
        >
            {component}
        </Lightbox>
    );
};

export default Modal;
