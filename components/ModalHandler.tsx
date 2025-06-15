import { createContext, useContext, ReactNode, useState } from "react";
import { Modal, View, Button, StyleSheet, Text } from "react-native";
import { Colors } from "../constants";
import ModalButton from "./Button";


type ModalOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type ModalContextType = {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({});

  const showModal = (opts: ModalOptions) => {
    setOptions(opts);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setOptions({});
  };

  const handleConfirm = async () => {
    options.onConfirm?.();
    hideModal();
  };

  const handleCancel = () => {
    options.onCancel?.();
    hideModal();
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={hideModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            {options.title && <Text style={styles.title}>{options.title}</Text>}
            {options.message && <Text style={styles.message}>{options.message}</Text>}

            <View style={styles.buttonRow}>
              {options.cancelText && (
                <ModalButton text={options.cancelText} onPress={handleCancel} />
              )}
              <ModalButton text={options.confirmText || 'OK'} onPress={handleConfirm} />
            </View>
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: Colors.primaryGradient[2],
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: Colors.textPrimary,
    textAlign: 'center'
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.textSecondary,
    textAlign: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    alignSelf: 'center',
    color: Colors.textSecondaryLight
  }
});