import { ViewStyle, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Colors } from "../constants";

type ModalButtonProps = {
    text: string;
    onPress: () => void;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    style?: ViewStyle;
}

const ModalButton: React.FC<ModalButtonProps> = ({
  text,
  onPress,
  loading = false,
  variant = 'primary',
  disabled = false,
  style
}) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textSecondaryLight} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginHorizontal: 5
  },
  primary: {
    backgroundColor: Colors.primaryGradient[0]
  },
  secondary: {
    backgroundColor: Colors.secondary
  },
  disabled: {
    opacity: 0.6
  },
  buttonText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  }
});