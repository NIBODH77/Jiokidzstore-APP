
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Pressable, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '@/navigation/RootNavigator';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleSendOTP = () => {
    if (isLogin && phone.length === 10) {
      navigation.navigate('OTP', { phone: `+91${phone}`, name: 'User' });
    } else if (!isLogin && phone.length === 10 && name.length > 0) {
      navigation.navigate('OTP', { phone: `+91${phone}`, name });
    }
  };

  const isFormValid = isLogin 
    ? phone.length === 10 
    : phone.length === 10 && name.length > 2;

  return (
    <View style={styles.rootContainer}>
      {/* Top Pink Section - Logo & Tabs */}
      <LinearGradient
        colors={['#FFD4E5', '#FFE5EE']}
        style={[styles.pinkSection, { paddingTop: insets.top }]}
      >
        <View style={styles.logoSection}>
          <Image
            source={require('@/attached_assets/JioKidslogo_1763910976445.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <Pressable 
            style={[styles.tab, isLogin && styles.tabActive]}
            onPress={() => {
              setIsLogin(true);
              setName('');
            }}
          >
            <ThemedText style={[styles.tabText, isLogin && styles.tabTextActive]}>
              Login
            </ThemedText>
            {isLogin && <View style={styles.tabIndicator} />}
          </Pressable>
          
          <Pressable 
            style={[styles.tab, !isLogin && styles.tabActive]}
            onPress={() => {
              setIsLogin(false);
              setPhone('');
            }}
          >
            <ThemedText style={[styles.tabText, !isLogin && styles.tabTextActive]}>
              Register
            </ThemedText>
            {!isLogin && <View style={styles.tabIndicator} />}
          </Pressable>
        </View>
      </LinearGradient>

      {/* Bottom White Section - Form */}
      {isLogin ? (
        <View style={[styles.whiteSection, { paddingBottom: insets.bottom }]}>
          <View style={styles.formContainer}>
            <ThemedText style={styles.title}>
              Welcome Back
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Login to continue shopping
            </ThemedText>

            {/* Phone Field */}
            <View style={styles.inputWrapper}>
              <ThemedText style={styles.inputLabel}>Mobile Number</ThemedText>
              <View style={[styles.modernInputContainer, phone.length > 0 && styles.modernInputActive]}>
                <View style={styles.modernInputGradient}>
                  <Feather name="phone" size={20} color="#FF6B9D" style={styles.inputIcon} />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter 10 digit number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.modernPhoneInput}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
              {phone.length > 0 && phone.length < 10 && (
                <ThemedText style={styles.helperText}>
                  {10 - phone.length} more digits needed
                </ThemedText>
              )}
            </View>

            <Pressable
              onPress={handleSendOTP}
              disabled={!isFormValid}
              style={[
                styles.submitButton,
                isFormValid && styles.submitButtonActive
              ]}
            >
              <LinearGradient
                colors={isFormValid ? ['#FF6B9D', '#FF8FB3'] : ['#D0D0D0', '#B8B8B8']}
                style={styles.submitButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <ThemedText style={[
                  styles.submitButtonText,
                  !isFormValid && styles.submitButtonTextDisabled
                ]}>
                  Continue
                </ThemedText>
              </LinearGradient>
            </Pressable>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <ThemedText style={styles.dividerText}>OR</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            <Pressable style={styles.socialButton}>
              <ThemedText style={styles.socialButtonText}>
                Continue with Google
              </ThemedText>
            </Pressable>

            <ThemedText style={styles.termsText}>
              By continuing, you agree to our{'\n'}
              <ThemedText style={styles.termsLink}>Terms of Service</ThemedText>
              {' and '}
              <ThemedText style={styles.termsLink}>Privacy Policy</ThemedText>
            </ThemedText>
          </View>
        </View>
      ) : (
        <ScrollView style={[styles.whiteSection, { paddingBottom: insets.bottom }]} contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <ThemedText style={styles.title}>
              Create Account
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Register to start shopping
            </ThemedText>

            {/* Name Field for Register */}
            <View style={styles.inputWrapper}>
              <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
              <View style={[styles.modernInputContainer, name.length > 0 && styles.modernInputActive]}>
                <View style={styles.modernInputGradient}>
                  <Feather name="user" size={20} color="#FF6B9D" style={styles.inputIcon} />
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    style={styles.modernPhoneInput}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
            </View>

            {/* Phone Field */}
            <View style={styles.inputWrapper}>
              <ThemedText style={styles.inputLabel}>Mobile Number</ThemedText>
              <View style={[styles.modernInputContainer, phone.length > 0 && styles.modernInputActive]}>
                <View style={styles.modernInputGradient}>
                  <Feather name="phone" size={20} color="#FF6B9D" style={styles.inputIcon} />
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter 10 digit number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.modernPhoneInput}
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
              {phone.length > 0 && phone.length < 10 && (
                <ThemedText style={styles.helperText}>
                  {10 - phone.length} more digits needed
                </ThemedText>
              )}
            </View>

            <Pressable
              onPress={handleSendOTP}
              disabled={!isFormValid}
              style={[
                styles.submitButton,
                isFormValid && styles.submitButtonActive
              ]}
            >
              <LinearGradient
                colors={isFormValid ? ['#FF6B9D', '#FF8FB3'] : ['#D0D0D0', '#B8B8B8']}
                style={styles.submitButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <ThemedText style={[
                  styles.submitButtonText,
                  !isFormValid && styles.submitButtonTextDisabled
                ]}>
                  Register
                </ThemedText>
              </LinearGradient>
            </Pressable>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <ThemedText style={styles.dividerText}>OR</ThemedText>
              <View style={styles.dividerLine} />
            </View>

            <Pressable style={styles.socialButton}>
              <ThemedText style={styles.socialButtonText}>
                Continue with Google
              </ThemedText>
            </Pressable>

            <ThemedText style={styles.termsText}>
              By continuing, you agree to our{'\n'}
              <ThemedText style={styles.termsLink}>Terms of Service</ThemedText>
              {' and '}
              <ThemedText style={styles.termsLink}>Privacy Policy</ThemedText>
            </ThemedText>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pinkSection: {
    flex: 0.33,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logo: {
    width: 140,
    height: 70,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255, 107, 157, 0.2)',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 0,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 107, 157, 0.6)',
  },
  tabTextActive: {
    color: '#FF6B9D',
    fontSize: 16,
    fontWeight: '700',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FF6B9D',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  whiteSection: {
    flex: 0.67,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  helperText: {
    fontSize: 11,
    color: '#FF6B9D',
    fontWeight: '500',
    marginTop: 4,
  },
  modernInputContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFB6D9',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  modernInputActive: {
    borderColor: '#FF6B9D',
    shadowOpacity: 0.15,
    elevation: 3,
  },
  modernInputGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    height: 54,
    backgroundColor: 'transparent',
  },
  inputIcon: {
    marginRight: 10,
  },
  modernPhoneInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    paddingVertical: 4,
    backgroundColor: 'transparent',
  },
  submitButton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonActive: {
    shadowOpacity: 0.2,
    elevation: 4,
  },
  submitButtonGradient: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  submitButtonTextDisabled: {
    color: '#6B7280',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    marginHorizontal: 12,
  },
  socialButton: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  termsText: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#FF6B9D',
    fontWeight: '600',
  },
});
