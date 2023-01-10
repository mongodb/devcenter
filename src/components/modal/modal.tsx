import { Lightbox } from '@mdb/flora';
import { useModalContext } from '../../contexts/modal';

const Modal = () => {
    const { component, closeModal } = useModalContext();

    return (
        <Lightbox
            isOpen={!!component}
            onClose={closeModal}
            sx={{ '>div': { height: 'unset' } }}
        >
            {component}
        </Lightbox>
    );
};

export default Modal;
