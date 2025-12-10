import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RoleType = 'MOM' | 'DAD' | 'GUARDIAN' | 'EXPECTING' | 'TRYING TO CONCEIVE' | null;
type ExpectingType = 'EXPECTING MOTHER' | 'EXPECTING FATHER' | null;

export default function PersonalDetailsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Lolu');
  const [selectedRole, setSelectedRole] = useState<RoleType>('EXPECTING');
  const [expectingType, setExpectingType] = useState<ExpectingType>(null);
  const [dueDate, setDueDate] = useState('');

  const roles: RoleType[] = ['MOM', 'DAD', 'GUARDIAN', 'EXPECTING', 'TRYING TO CONCEIVE'];

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      <View style={styles.headerLine} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={60} color="#999" />
          </View>
          <TouchableOpacity style={styles.cameraBtn}>
            <View style={styles.cameraBtnInner}>
              <Ionicons name="camera" size={16} color="#333" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Enter your name*</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.rolesGrid}>
          <View style={styles.rolesRow}>
            <TouchableOpacity
              style={[styles.roleBtn, selectedRole === 'MOM' && styles.roleBtnSelected]}
              onPress={() => setSelectedRole('MOM')}
            >
              <View style={[styles.radioOuter, selectedRole === 'MOM' && styles.radioOuterSelected]}>
                {selectedRole === 'MOM' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.roleText}>MOM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleBtn, selectedRole === 'DAD' && styles.roleBtnSelected]}
              onPress={() => setSelectedRole('DAD')}
            >
              <View style={[styles.radioOuter, selectedRole === 'DAD' && styles.radioOuterSelected]}>
                {selectedRole === 'DAD' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.roleText}>DAD</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rolesRow}>
            <TouchableOpacity
              style={[styles.roleBtn, selectedRole === 'GUARDIAN' && styles.roleBtnSelected]}
              onPress={() => setSelectedRole('GUARDIAN')}
            >
              <View style={[styles.radioOuter, selectedRole === 'GUARDIAN' && styles.radioOuterSelected]}>
                {selectedRole === 'GUARDIAN' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.roleText}>GUARDIAN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleBtn, selectedRole === 'EXPECTING' && styles.roleBtnSelected]}
              onPress={() => setSelectedRole('EXPECTING')}
            >
              <View style={[styles.radioOuter, selectedRole === 'EXPECTING' && styles.radioOuterSelected]}>
                {selectedRole === 'EXPECTING' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.roleText}>EXPECTING</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rolesRow}>
            <TouchableOpacity
              style={[styles.roleBtn, selectedRole === 'TRYING TO CONCEIVE' && styles.roleBtnSelected]}
              onPress={() => setSelectedRole('TRYING TO CONCEIVE')}
            >
              <View style={[styles.radioOuter, selectedRole === 'TRYING TO CONCEIVE' && styles.radioOuterSelected]}>
                {selectedRole === 'TRYING TO CONCEIVE' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.roleText}>TRYING TO CONCEIVE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {selectedRole === 'EXPECTING' && (
          <View style={styles.expectingSection}>
            <Text style={styles.iAmAnLabel}>I am an..</Text>
            
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setExpectingType(expectingType === 'EXPECTING MOTHER' ? null : 'EXPECTING MOTHER')}
            >
              <View style={[styles.checkbox, expectingType === 'EXPECTING MOTHER' && styles.checkboxSelected]}>
                {expectingType === 'EXPECTING MOTHER' && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>EXPECTING MOTHER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setExpectingType(expectingType === 'EXPECTING FATHER' ? null : 'EXPECTING FATHER')}
            >
              <View style={[styles.checkbox, expectingType === 'EXPECTING FATHER' && styles.checkboxSelected]}>
                {expectingType === 'EXPECTING FATHER' && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>EXPECTING FATHER</Text>
            </TouchableOpacity>

            <View style={styles.dueDateSection}>
              <Text style={styles.dueDateLabel}>Enter Due Date</Text>
              <TouchableOpacity style={styles.dueDateInput}>
                <Text style={styles.dueDatePlaceholder}>{dueDate || ''}</Text>
                <Ionicons name="calendar-outline" size={24} color="#999" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>SAVE</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F5C518',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerLine: {
    height: 4,
    backgroundColor: '#E5A500',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#F5F5F5',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 30,
    right: '35%',
  },
  cameraBtnInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  formSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
  },
  rolesGrid: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  rolesRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  roleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    flex: 1,
  },
  roleBtnSelected: {
    borderColor: '#333',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: '#333',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  roleText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  expectingSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 16,
  },
  iAmAnLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  dueDateSection: {
    marginTop: 16,
  },
  dueDateLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  dueDateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
  },
  dueDatePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  saveBtn: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
