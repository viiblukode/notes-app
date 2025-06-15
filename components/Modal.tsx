import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";


type ModalProps = {
    isVisible: boolean;
    title: string;
    message: string;
    onDismiss: () => void;
    dismissText?: string;
}

export const ModalView:React.FC<ModalProps> = ({
    isVisible,
    title = '',
    message = '',
    onDismiss,
    dismissText = 'Close',
}) => {

    return (
        <Modal
            visible={isVisible}
            onRequestClose={onDismiss}
            >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                <Text style={styles.alertTitle}>{title}</Text>
                <Text style={styles.alertMessage}>{message}</Text>

                <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
                    <Text style={styles.dismissText}>{dismissText}</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  alertMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  dismissButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  dismissText: {
    color: '#fff',
    fontSize: 16,
  },
})