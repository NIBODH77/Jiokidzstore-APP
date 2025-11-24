import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import type { RootStackParamList } from '@/navigation/RootNavigator';

export default function OTPScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'OTP'>>();
  const { signIn } = useAuth();
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      // Sign in the user
      await signIn({
        id: '1',
        name: route.params.name || 'User',
        phone: route.params.phone,
      });
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const allDigitsFilled = otp.join('').length === 6;

  return (
    <View style={styles.rootContainer}>
      {/* Top Pink Section */}
      <LinearGradient
        colors={['#FFD4E5', '#FFE5EE']}
        style={[styles.pinkSection, { paddingTop: insets.top }]}
      >
        <View style={styles.headerContent}>
          <Pressable 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Feather name="arrow-left" size={24} color="#FF6B9D" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>Verify OTP</ThemedText>
          <View style={styles.spacer} />
        </View>
      </LinearGradient>

      {/* Bottom White Section */}
      <View style={[styles.whiteSection, { paddingBottom: insets.bottom }]}>
        <View style={styles.contentContainer}>
          <ThemedText style={styles.title}>
            Enter 6-Digit Code
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            We've sent it to{'\n'}
            <ThemedText style={styles.phoneNumber}>{route.params.phone}</ThemedText>
          </ThemedText>

          {/* OTP Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.otpBoxWrapper,
                  digit && styles.otpBoxFilled,
                ]}
              >
                <TextInput
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  autoFocus={index === 0}
                  placeholderTextColor="#DDD"
                />
              </View>
            ))}
          </View>

          {/* Timer or Resend */}
          <View style={styles.timerContainer}>
            {timer > 0 ? (
              <>
                <ThemedText style={styles.timerLabel}>Resend code in</ThemedText>
                <ThemedText style={styles.timerValue}>
                  00:{timer.toString().padStart(2, '0')}
                </ThemedText>
              </>
            ) : (
              <Pressable onPress={handleResend} style={styles.resendButton}>
                <Feather name="refresh-cw" size={16} color="#FF6B9D" />
                <ThemedText style={styles.resendText}>Resend Code</ThemedText>
              </Pressable>
            )}
          </View>

          {/* Verify Button */}
          <Pressable
            onPress={handleVerify}
            disabled={!allDigitsFilled}
            style={[
              styles.verifyButton,
              allDigitsFilled && styles.verifyButtonActive
            ]}
          >
            <LinearGradient
              colors={allDigitsFilled ? ['#FF6B9D', '#FF8FB3'] : ['#D0D0D0', '#B8B8B8']}
              style={styles.verifyButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={[
                styles.verifyButtonText,
                !allDigitsFilled && styles.verifyButtonTextDisabled
              ]}>
                Verify OTP
              </ThemedText>
            </LinearGradient>
          </Pressable>

          {/* Info Text */}
          <ThemedText style={styles.infoText}>
            Didn't receive the code?{'\n'}
            Check your spam folder
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pinkSection: {
    flex: 0.25,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    paddingBottom: 16,
  },
  backButton: {
    padding: 12,
    marginLeft: -12,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B9D',
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 24,
  },
  whiteSection: {
    flex: 0.75,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 28,
    lineHeight: 20,
  },
  phoneNumber: {
    color: '#FF6B9D',
    fontWeight: '700',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 32,
  },
  otpBoxWrapper: {
    width: 50,
    height: 56,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#FFB6D9',
    backgroundColor: 'rgba(255, 182, 217, 0.1)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  otpBoxFilled: {
    borderColor: '#FF6B9D',
    backgroundColor: 'rgba(255, 107, 157, 0.05)',
    shadowOpacity: 0.15,
    elevation: 3,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1F2937',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 182, 217, 0.1)',
    borderRadius: 12,
  },
  timerLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  timerValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B9D',
    marginTop: 4,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B9D',
  },
  verifyButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  verifyButtonActive: {
    shadowOpacity: 0.2,
    elevation: 4,
  },
  verifyButtonGradient: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  verifyButtonTextDisabled: {
    color: '#6B7280',
  },
  infoText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
});
