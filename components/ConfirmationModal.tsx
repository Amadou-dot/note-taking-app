'use client';
import { Button } from '@heroui/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/modal';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'danger' | 'warning';
};

/**
 * A modal component that displays a confirmation dialog with customizable title, body, and buttons.
 *
 * @param {boolean} isOpen - Determines if the modal is open or closed.
 * @param {() => void} onClose - Function to call when the modal is closed.
 * @param {() => void} onConfirm - Function to call when the confirm button is pressed.
 * @param {string} title - The title of the confirmation modal.
 * @param {string} body - The body text of the confirmation modal.
 * @param {string} [confirmText='Confirm'] - The text for the confirm button default ('Confirm') .
 * @param {string} [cancelText='Cancel'] - The text for the cancel button default ('Cancel').
 * @param {string} [confirmColor='danger'] - The color of the confirm button default ('danger').
 *
 * @component
 * @example
 * <ConfirmationModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   onConfirm={handleConfirm}
 *   title="Confirm Action"
 *   body="Are you sure you want to proceed?"
 *   confirmText="Yes"
 *   cancelText="No"
 *   confirmColor="primary"
 * />
 */
export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'danger',
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <p>{body}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant='light' onPress={onClose}>
            {cancelText}
          </Button>
          <Button color={confirmColor} onPress={handleConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
