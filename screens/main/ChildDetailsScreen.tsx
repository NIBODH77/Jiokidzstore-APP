import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
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
  const [savedChildren, setSavedChildren] = useState<Child[]>([
    {
      id: '1',
      name: 'Sample Child',
      dob: '01-Jan-2020',
      gender: 'BOY',
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [formName, setFormName] = useState('');
  const [formDob, setFormDob] = useState('');
  const [formGender, setFormGender] = useState<'BOY' | 'GIRL'>('BOY');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth());
  const [pickerYear, setPickerYear] = useState(currentYear);
  const [pickerDay, setPickerDay] = useState(new Date().getDate());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateSelect = () => {
    const formattedDate = `${String(pickerDay).padStart(2, '0')}-${months[pickerMonth]}-${pickerYear}`;
    setFormDob(formattedDate);
    setShowDatePicker(false);
  };

  const handleEditChild = (child: Child) => {
    setEditingChildId(child.id);
    setFormName(child.name);
    setFormDob(child.dob);
    setFormGender(child.gender);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const handleDeleteChild = (childId: string) => {
    Alert.alert(
      'Delete Child',
      'Are you sure you want to delete this child?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setSavedChildren(savedChildren.filter(c => c.id !== childId));
          }
        }
      ]
    );
  };

  const handleSave = () => {
    if (!formName || !formDob) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (isEditing && editingChildId) {
      setSavedChildren(savedChildren.map(c => 
        c.id === editingChildId 
          ? { ...c, name: formName, dob: formDob, gender: formGender }
          : c
      ));
    } else {
      const newChild: Child = {
        id: String(Date.now()),
        name: formName,
        dob: formDob,
        gender: formGender,
      };
      setSavedChildren([...savedChildren, newChild]);
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormName('');
    setFormDob('');
    setFormGender('BOY');
    setIsEditing(false);
    setEditingChildId(null);
    setShowAddForm(false);
  };

  const handleAddChild = () => {
    setShowAddForm(true);
    setIsEditing(false);
    setEditingChildId(null);
    setFormName('');
    setFormDob('');
    setFormGender('BOY');
  };

  return (
    <View style={[styles.container, { paddingTop: 90 }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {savedChildren.map((child) => (
          <View key={child.id} style={styles.savedChildCard}>
            <View style={styles.savedAvatarSection}>
              <View style={[styles.savedAvatar, { backgroundColor: child.gender === 'BOY' ? '#E3F2FD' : '#FCE4EC' }]}>
                <View style={styles.avatarImageContainer}>
                  <View style={styles.avatarFace}>
                    <View style={styles.hair} />
                    <View style={styles.face}>
                      <View style={styles.faceInner} />
                    </View>
                    <View style={styles.body}>
                      <View style={[styles.shirt, { backgroundColor: child.gender === 'BOY' ? '#4CAF50' : '#E91E63' }]} />
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.savedCameraBtn}>
                <View style={styles.cameraBtnInner}>
                  <Ionicons name="camera" size={14} color="#333" />
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.enrolledText}>Enrolled In FPL</Text>

            <View style={styles.childInfoRow}>
              <Text style={styles.childName}>{child.name}</Text>
              <View style={styles.childActions}>
                <TouchableOpacity onPress={() => handleEditChild(child)} style={styles.actionBtn}>
                  <Ionicons name="pencil-outline" size={20} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteChild(child.id)} style={styles.actionBtn}>
                  <Ionicons name="trash-outline" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.childDetailRow}>
              <Text style={styles.childDetailLabel}>Date Of Birth</Text>
              <Text style={styles.childDetailValue}>: {child.dob}</Text>
            </View>

            <View style={styles.childDetailRow}>
              <Text style={styles.childDetailLabel}>Gender</Text>
              <Text style={styles.childDetailValue}>: {child.gender === 'BOY' ? 'Boy' : 'Girl'}</Text>
            </View>
          </View>
        ))}

        {showAddForm && (
          <View style={styles.childCard}>
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={50} color="#999" />
              </View>
              <TouchableOpacity style={styles.cameraBtn}>
                <View style={styles.cameraBtnInner}>
                  <Ionicons name="camera" size={16} color="#333" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Enter Child's Date of Birth *</Text>
              <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
                <Text style={[styles.dateInputPlaceholder, formDob && styles.dateInputValue]}>{formDob || ''}</Text>
                <Ionicons name="calendar-outline" size={24} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Enter Child's Name *</Text>
              <TextInput
                style={styles.input}
                value={formName}
                onChangeText={setFormName}
                placeholder=""
              />
            </View>

            <View style={styles.genderSection}>
              <TouchableOpacity
                style={[styles.genderBtn, formGender === 'BOY' && styles.genderBtnSelected]}
                onPress={() => setFormGender('BOY')}
              >
                <View style={[styles.radioOuter, formGender === 'BOY' && styles.radioOuterSelected]}>
                  {formGender === 'BOY' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.genderText}>BOY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderBtn, formGender === 'GIRL' && styles.genderBtnSelected]}
                onPress={() => setFormGender('GIRL')}
              >
                <View style={[styles.radioOuter, formGender === 'GIRL' && styles.radioOuterSelected]}>
                  {formGender === 'GIRL' && <View style={styles.radioInner} />}
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
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      <TouchableOpacity style={styles.addChildBtn} onPress={handleAddChild}>
        <Ionicons name="add" size={24} color="#333" />
        <Text style={styles.addChildText}>Add Another Child</Text>
      </TouchableOpacity>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Day</Text>
                <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                  {Array.from({ length: getDaysInMonth(pickerMonth, pickerYear) }, (_, i) => i + 1).map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[styles.pickerItem, pickerDay === day && styles.pickerItemSelected]}
                      onPress={() => setPickerDay(day)}
                    >
                      <Text style={[styles.pickerItemText, pickerDay === day && styles.pickerItemTextSelected]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Month</Text>
                <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={month}
                      style={[styles.pickerItem, pickerMonth === index && styles.pickerItemSelected]}
                      onPress={() => setPickerMonth(index)}
                    >
                      <Text style={[styles.pickerItemText, pickerMonth === index && styles.pickerItemTextSelected]}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Year</Text>
                <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[styles.pickerItem, pickerYear === year && styles.pickerItemSelected]}
                      onPress={() => setPickerYear(year)}
                    >
                      <Text style={[styles.pickerItemText, pickerYear === year && styles.pickerItemTextSelected]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleDateSelect}>
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  savedChildCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  savedAvatarSection: {
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  savedAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  savedCameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
  },
  enrolledText: {
    textAlign: 'center',
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  childInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 12,
    marginBottom: 12,
  },
  childName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  childActions: {
    flexDirection: 'row',
  },
  actionBtn: {
    padding: 4,
    marginLeft: 12,
  },
  childDetailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  childDetailLabel: {
    fontSize: 14,
    color: '#333',
    width: 100,
  },
  childDetailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  childCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 8,
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
    backgroundColor: '#E0E0E0',
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
    width: 60,
    height: 60,
    alignItems: 'center',
  },
  hair: {
    width: 40,
    height: 20,
    backgroundColor: '#2C3E50',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    top: 3,
  },
  face: {
    width: 35,
    height: 28,
    backgroundColor: '#FFDAB9',
    borderRadius: 17,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceInner: {
    width: 28,
    height: 20,
    backgroundColor: '#FFE4C4',
    borderRadius: 12,
  },
  body: {
    marginTop: 2,
  },
  shirt: {
    width: 45,
    height: 25,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
  dateInputValue: {
    color: '#333',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  pickerScroll: {
    height: 200,
  },
  pickerItem: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  pickerItemSelected: {
    backgroundColor: '#FF6B35',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333',
  },
  pickerItemTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
