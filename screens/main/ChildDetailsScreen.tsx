import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Child {
  id: string;
  name: string;
  dob: string;
  gender: 'BOY' | 'GIRL';
}

export default function ChildDetailsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [children, setChildren] = useState<Child[]>([
    { id: '1', name: '', dob: '', gender: 'BOY' }
  ]);
  const [editingChild, setEditingChild] = useState<Child>(children[0]);

  const handleGenderChange = (gender: 'BOY' | 'GIRL') => {
    setEditingChild({ ...editingChild, gender });
  };

  const handleSave = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAddChild = () => {
    const newChild: Child = {
      id: String(children.length + 1),
      name: '',
      dob: '',
      gender: 'BOY',
    };
    setChildren([...children, newChild]);
    setEditingChild(newChild);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Child Details</Text>
      </View>
      <View style={styles.headerLine} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.childCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <View style={styles.avatarImageContainer}>
                <View style={styles.avatarFace}>
                  <View style={styles.hair} />
                  <View style={styles.face}>
                    <View style={styles.faceInner} />
                  </View>
                  <View style={styles.body}>
                    <View style={styles.shirt} />
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.cameraBtn}>
              <View style={styles.cameraBtnInner}>
                <Ionicons name="camera" size={16} color="#333" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Enter Child's Date of Birth *</Text>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateInputPlaceholder}>{editingChild.dob || ''}</Text>
              <Ionicons name="calendar-outline" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Enter Child's Name *</Text>
            <TextInput
              style={styles.input}
              value={editingChild.name}
              onChangeText={(text) => setEditingChild({ ...editingChild, name: text })}
              placeholder=""
            />
          </View>

          <View style={styles.genderSection}>
            <TouchableOpacity
              style={[styles.genderBtn, editingChild.gender === 'BOY' && styles.genderBtnSelected]}
              onPress={() => handleGenderChange('BOY')}
            >
              <View style={[styles.radioOuter, editingChild.gender === 'BOY' && styles.radioOuterSelected]}>
                {editingChild.gender === 'BOY' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>BOY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderBtn, editingChild.gender === 'GIRL' && styles.genderBtnSelected]}
              onPress={() => handleGenderChange('GIRL')}
            >
              <View style={[styles.radioOuter, editingChild.gender === 'GIRL' && styles.radioOuterSelected]}>
                {editingChild.gender === 'GIRL' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderText}>GIRL</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      <TouchableOpacity style={styles.addChildBtn} onPress={handleAddChild}>
        <Ionicons name="add" size={24} color="#333" />
        <Text style={styles.addChildText}>Add Another Child</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  },
  childCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE4C4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFace: {
    width: 80,
    height: 80,
    alignItems: 'center',
  },
  hair: {
    width: 50,
    height: 25,
    backgroundColor: '#2C3E50',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    top: 5,
  },
  face: {
    width: 45,
    height: 35,
    backgroundColor: '#FFDAB9',
    borderRadius: 22,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceInner: {
    width: 35,
    height: 25,
    backgroundColor: '#FFE4C4',
    borderRadius: 15,
  },
  body: {
    marginTop: 2,
  },
  shirt: {
    width: 55,
    height: 30,
    backgroundColor: '#3498DB',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: '30%',
  },
  cameraBtnInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  formSection: {
    marginBottom: 20,
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
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
  },
  dateInputPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  genderSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  genderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginRight: 12,
    flex: 1,
  },
  genderBtnSelected: {
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
  genderText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  addChildBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addChildText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
});
