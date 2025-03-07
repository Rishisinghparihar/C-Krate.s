import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PinLockModal = ({ visible, onClose, onConfirm }) => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }
    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }
    onConfirm(pin);
  };

  return visible ? (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Set a 4-digit PIN</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PIN"
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          value={pin}
          onChangeText={setPin}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm PIN"
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          value={confirmPin}
          onChangeText={setConfirmPin}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirm} style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: { backgroundColor: "#333", padding: 20, borderRadius: 10, width: 300 },
  title: {
    fontSize: 18,
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: "white",
  },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  button: { padding: 10, backgroundColor: "#FFD700", borderRadius: 5 },
  buttonText: { color: "#333", fontWeight: "bold" },
  error: { color: "red", textAlign: "center", marginBottom: 5 },
});

export default PinLockModal;
