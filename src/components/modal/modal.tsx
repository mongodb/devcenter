import { Lightbox } from '@mdb/flora';
import { useModalContext } from '../../contexts/modal';

const Modal = () => {
    const { component, props, closeModal } = useModalContext();

    function onLightboxClose() {
        // TODO: will this override then other close methods?
        if (props?.onCloseCallback) {
            props.onCloseCallback();
        }

        closeModal();
    }

    return (
        <Lightbox
            isOpen={!!component}
            onClose={onLightboxClose}
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
