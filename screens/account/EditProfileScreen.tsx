import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenKeyboardAwareScrollView } from '@/components/ScreenKeyboardAwareScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Toast } from '@/components/Toast';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [email, setEmail] = useState(user?.email || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(user?.gender || 'male');
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSave = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      // Save profile changes here
      setTimeout(() => {
        setShowSuccessToast(true);
        setLoading(false);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
      setLoading(false);
    }
  };

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ] as const;

  return (
    <View style={styles.wrapper}>
      <ScreenKeyboardAwareScrollView contentContainerStyle={{ paddingTop: Spacing.lg, paddingBottom: Spacing.xl }}>
        <View style={[styles.container, { paddingTop: Spacing.lg }]}>
        {/* User Info Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Feather name="user" size={40} color={Colors.light.primary} />
            </View>
          </View>
          <ThemedText style={styles.headerText}>{user?.name || 'User'}</ThemedText>
        </View>

        {/* Email Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Email Address</ThemedText>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={18} color={Colors.light.textGray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.light.textGray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
              selectionColor={Colors.light.primary}
            />
          </View>
          <ThemedText style={styles.hint}>We'll use this to send you updates and notifications</ThemedText>
        </View>

        {/* Gender Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Gender</ThemedText>
          <View style={styles.genderContainer}>
            {genderOptions.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.genderOption,
                  gender === option.value && styles.genderOptionSelected,
                ]}
                onPress={() => !loading && setGender(option.value)}
              >
                <View style={[styles.genderRadio, gender === option.value && styles.genderRadioSelected]}>
                  {gender === option.value && <View style={styles.genderRadioDot} />}
                </View>
                <ThemedText style={[styles.genderLabel, gender === option.value && styles.genderLabelSelected]}>
                  {option.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <LinearGradient
              colors={loading ? ['#FFB3D1', '#FFC9DC'] : ['#FF6B9D', '#FF8FB3']}
              style={styles.buttonGradient}
            >
              {loading ? (
                <ThemedText style={styles.buttonText}>Saving...</ThemedText>
              ) : (
                <View style={styles.buttonContent}>
                  <Feather name="check" size={18} color="#FFFFFF" />
                  <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
                </View>
              )}
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.cancelButton, pressed && styles.cancelButtonPressed]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
          </Pressable>
        </View>
      </View>
      </ScreenKeyboardAwareScrollView>
      {showSuccessToast && (
        <Toast 
          message="Profile updated successfully" 
          type="success" 
          duration={2000}
          onDismiss={() => setShowSuccessToast(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingTop: 0,
  },
  avatarContainer: {
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: Spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: '#1F2937',
    fontFamily: 'Poppins',
  },
  hint: {
    fontSize: 12,
    color: Colors.light.textGray,
    fontStyle: 'italic',
  },
  genderContainer: {
    gap: Spacing.md,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: BorderRadius.sm,
    backgroundColor: '#FFFFFF',
  },
  genderOptionSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: 'rgba(255, 107, 157, 0.08)',
  },
  genderRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  genderRadioSelected: {
    borderColor: Colors.light.primary,
  },
  genderRadioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.primary,
  },
  genderLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
  },
  genderLabelSelected: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  saveButton: {
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
    borderRadius: BorderRadius.sm,
  },
  cancelButtonPressed: {
    opacity: 0.7,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
  },
});
