import { Lightbox } from '@mdb/flora';
import { useModalContext } from '../../contexts/modal';

const Modal = () => {
    const { component, props, closeModal } = useModalContext();

    return (
        <Lightbox
            isOpen={!!component}
            onClose={closeModal}
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
