
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Clipboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function InvitesCreditsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [copied, setCopied] = useState(false);

  const referralCode = 'INVITE2025';
  const referralLink = 'https://jiokidz.com/ref/INVITE2025';

  const handleCopy = () => {
    Clipboard.setString(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Copied!', 'Referral link copied to clipboard');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Use my referral code ${referralCode} and get exciting rewards! ${referralLink}`,
        title: 'Join me on JioKidz!',
      });
    } catch (error) {
      console.log('Share cancelled');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invites & Credits</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Invite & Earn{' '}
            <Text style={styles.heroHighlight}>Rewards</Text>
          </Text>
          <Text style={styles.heroSubtitle}>Share the joy and get rewarded together!</Text>
        </View>

        {/* Main Info Card */}
        <View style={styles.mainCard}>
          <Text style={styles.mainCardTitle}>Share & Earn Together</Text>
          <Text style={styles.mainCardText}>
            Share your referral link and earn rewards when your friends join our platform!
          </Text>

          {/* Illustration */}
          <View style={styles.illustration}>
            <View style={styles.iconCircle}>
              <Ionicons name="people" size={32} color="#FF6B35" />
            </View>
            <View style={styles.connector}>
              <View style={[styles.dot, { opacity: 0.8 }]} />
              <View style={[styles.dot, { opacity: 0.6 }]} />
              <View style={[styles.dot, { opacity: 0.4 }]} />
            </View>
            <View style={styles.iconCircle}>
              <Ionicons name="gift" size={32} color="#FF6B35" />
            </View>
          </View>
        </View>

        {/* Referral Code Card */}
        <View style={styles.referralCard}>
          <Text style={styles.referralLabel}>YOUR REFERRAL CODE</Text>
          <View style={styles.codeContainer}>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{referralCode}</Text>
              <Text style={styles.linkText} numberOfLines={1}>
                {referralLink}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={handleCopy}
              activeOpacity={0.7}
            >
              <Ionicons name={copied ? 'checkmark' : 'copy-outline'} size={20} color="#FF6B35" />
              <Text style={styles.copyBtnText}>{copied ? 'Copied!' : 'Copy'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareBtn}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <Ionicons name="share-social" size={20} color="#FFF" />
              <Text style={styles.shareBtnText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Invite Friends Button */}
        <TouchableOpacity
          style={styles.inviteBtn}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Ionicons name="person-add" size={24} color="#FFF" />
          <Text style={styles.inviteBtnText}>Invite Friends Now</Text>
        </TouchableOpacity>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="trending-up" size={24} color="#FF6B35" />
            </View>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Total Invites</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="trophy" size={24} color="#FF6B35" />
            </View>
            <Text style={styles.statValue}>₹0</Text>
            <Text style={styles.statLabel}>Rewards Earned</Text>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>
            How It <Text style={styles.titleHighlight}>Works</Text>
          </Text>

          {/* Step 1 */}
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <Ionicons name="share-social" size={28} color="#FFF" />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Share Your Link</Text>
              <Text style={styles.stepText}>
                Share your unique referral link with friends via WhatsApp, email, or social media
              </Text>
            </View>
          </View>

          <View style={styles.stepConnector} />

          {/* Step 2 */}
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <Ionicons name="person-add" size={28} color="#FFF" />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Friend Signs Up</Text>
              <Text style={styles.stepText}>
                Your friend downloads the app and creates an account using your referral code
              </Text>
            </View>
          </View>

          <View style={styles.stepConnector} />

          {/* Step 3 */}
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <Ionicons name="gift" size={28} color="#FFF" />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>You Both Earn Rewards</Text>
              <Text style={styles.stepText}>
                Get instant rewards credited to your wallet once your friend completes their first order
              </Text>
            </View>
          </View>
        </View>

        {/* Benefits Banner */}
        <View style={styles.benefitsBanner}>
          <Ionicons name="gift" size={48} color="#FFF" />
          <Text style={styles.benefitsTitle}>Unlimited Earning Potential!</Text>
          <Text style={styles.benefitsText}>
            Refer more friends and earn more rewards. There's no limit to how much you can earn!
          </Text>
        </View>

        {/* Terms & Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <View style={styles.termItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.termText}>
              Reward will be credited after friend's first successful order
            </Text>
          </View>
          <View style={styles.termItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.termText}>
              Both referrer and referee must be new or active users
            </Text>
          </View>
          <View style={styles.termItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.termText}>
              Rewards cannot be transferred or exchanged for cash
            </Text>
          </View>
          <View style={styles.termItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.termText}>
              Company reserves the right to modify terms at any time
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#FFF3E6',
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  heroHighlight: {
    color: '#FF6B35',
    backgroundColor: '#FFE4D6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  mainCard: {
    backgroundColor: '#FF6B35',
    margin: 16,
    borderRadius: 24,
    padding: 24,
  },
  mainCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  mainCardText: {
    fontSize: 14,
    color: '#FFE4D6',
    lineHeight: 20,
  },
  illustration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 24,
  },
  iconCircle: {
    backgroundColor: '#FFF',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginHorizontal: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  referralCard: {
    backgroundColor: '#FFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FFE4D6',
  },
  referralLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    letterSpacing: 1,
  },
  codeContainer: {
    marginBottom: 16,
  },
  codeBox: {
    backgroundColor: '#FFF3E6',
    borderRadius: 12,
    padding: 16,
  },
  codeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    letterSpacing: 2,
    marginBottom: 4,
  },
  linkText: {
    fontSize: 12,
    color: '#666',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  copyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  copyBtnText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  shareBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inviteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    marginHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
  },
  inviteBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    margin: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF3E6',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statIcon: {
    backgroundColor: '#FFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  howItWorksSection: {
    backgroundColor: '#F9F9F9',
    margin: 16,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  titleHighlight: {
    color: '#FF6B35',
  },
  step: {
    flexDirection: 'row',
    gap: 16,
  },
  stepIcon: {
    backgroundColor: '#FF6B35',
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  stepConnector: {
    marginLeft: 28,
    borderLeftWidth: 2,
    borderColor: '#FFD6C2',
    borderStyle: 'dashed',
    height: 24,
  },
  benefitsBanner: {
    backgroundColor: '#FF6B35',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 12,
    marginBottom: 8,
  },
  benefitsText: {
    fontSize: 14,
    color: '#FFE4D6',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsSection: {
    backgroundColor: '#F9F9F9',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  termItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  bullet: {
    color: '#FF6B35',
    fontSize: 12,
    marginTop: 2,
  },
  termText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});
