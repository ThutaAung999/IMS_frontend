import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, onClose, className = '' }) {
    const dialog = useRef();

    console.log('open :', open);
    console.log('dialog.current :', dialog.current);

    const showModal = useCallback(() => {
        const modal = dialog.current;
        if (open && modal) {
            modal.showModal();
        }
    }, [open]);

    const closeModal = useCallback(() => {
        const modal = dialog.current;
        if (modal) {
            modal.close();
        }
    }, []);

    useEffect(() => {
        showModal();
        return () => closeModal();
    }, [showModal, closeModal]);

    return createPortal(
        <dialog ref={dialog} className={`modal1 ${className}`} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}
