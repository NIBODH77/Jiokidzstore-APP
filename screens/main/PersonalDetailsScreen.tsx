import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RoleType = 'MOM' | 'DAD' | 'GUARDIAN' | 'EXPECTING' | 'TRYING TO CONCEIVE' | null;
type ExpectingType = 'EXPECTING MOTHER' | 'EXPECTING FATHER' | null;
type GenderType = 'FEMALE' | 'MALE' | null;

export default function PersonalDetailsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Lolu');
  const [selectedRole, setSelectedRole] = useState<RoleType>('DAD');
  const [expectingType, setExpectingType] = useState<ExpectingType>(null);
  const [isExpectingAnother, setIsExpectingAnother] = useState(true);
  const [gender, setGender] = useState<GenderType>('MALE');
  const [dueDate, setDueDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const roles: RoleType[] = ['MOM', 'DAD', 'GUARDIAN', 'EXPECTING', 'TRYING TO CONCEIVE'];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const [pickerMonth, setPickerMonth] = useState(selectedDate.getMonth());
  const [pickerYear, setPickerYear] = useState(selectedDate.getFullYear());
  const [pickerDay, setPickerDay] = useState(selectedDate.getDate());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateSelect = () => {
    const formattedDate = `${String(pickerDay).padStart(2, '0')}-${months[pickerMonth]}-${pickerYear}`;
    setDueDate(formattedDate);
    setShowDatePicker(false);
  };

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
          <View style={[styles.avatar, (selectedRole === 'MOM' || selectedRole === 'DAD') ? styles.avatarWithImage : styles.avatarPlain]}>
            {(selectedRole === 'MOM' || selectedRole === 'DAD') ? (
              <View style={styles.avatarImageContainer}>
                <View style={styles.avatarFace}>
                  <View style={styles.hair} />
                  <View style={styles.face}>
                    <View style={styles.faceInner} />
                  </View>
                  <View style={styles.body}>
                    <View style={[styles.shirt, { backgroundColor: '#F5A623' }]} />
                  </View>
                </View>
              </View>
            ) : (
              <Ionicons name="person" size={60} color="#999" />
            )}
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

          {(selectedRole === 'MOM' || selectedRole === 'DAD') && (
            <TouchableOpacity
              style={styles.expectingAnotherRow}
              onPress={() => setIsExpectingAnother(!isExpectingAnother)}
            >
              <View style={[styles.checkbox, isExpectingAnother && styles.checkboxSelected]}>
                {isExpectingAnother && <Ionicons name="checkmark" size={14} color="#333" />}
              </View>
              <Text style={styles.expectingAnotherText}>I am expecting another child</Text>
            </TouchableOpacity>
          )}

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
                {expectingType === 'EXPECTING MOTHER' && <Ionicons name="checkmark" size={14} color="#333" />}
              </View>
              <Text style={styles.checkboxLabel}>EXPECTING MOTHER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setExpectingType(expectingType === 'EXPECTING FATHER' ? null : 'EXPECTING FATHER')}
            >
              <View style={[styles.checkbox, expectingType === 'EXPECTING FATHER' && styles.checkboxSelected]}>
                {expectingType === 'EXPECTING FATHER' && <Ionicons name="checkmark" size={14} color="#333" />}
              </View>
              <Text style={styles.checkboxLabel}>EXPECTING FATHER</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedRole === 'TRYING TO CONCEIVE' && (
          <View style={styles.genderSection}>
            <Text style={styles.areYouLabel}>Are You</Text>
            
            <TouchableOpacity
              style={styles.genderCheckboxRow}
              onPress={() => setGender(gender === 'FEMALE' ? null : 'FEMALE')}
            >
              <View style={[styles.genderCheckbox, gender === 'FEMALE' && styles.genderCheckboxSelected]}>
                {gender === 'FEMALE' && <Ionicons name="checkmark" size={14} color="#333" />}
              </View>
              <Text style={styles.genderLabel}>FEMALE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.genderCheckboxRow}
              onPress={() => setGender(gender === 'MALE' ? null : 'MALE')}
            >
              <View style={[styles.genderCheckbox, gender === 'MALE' && styles.genderCheckboxSelected]}>
                {gender === 'MALE' && <Ionicons name="checkmark" size={14} color="#333" />}
              </View>
              <Text style={styles.genderLabel}>MALE</Text>
            </TouchableOpacity>
          </View>
        )}

        {(selectedRole === 'MOM' || selectedRole === 'DAD' || selectedRole === 'EXPECTING') && (
          <View style={styles.dueDateSection}>
            <Text style={styles.dueDateLabel}>Enter Due Date</Text>
            <TouchableOpacity style={styles.dueDateInput} onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.dueDatePlaceholder, dueDate && styles.dueDateValue]}>{dueDate || ''}</Text>
              <Ionicons name="calendar-outline" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>SAVE</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Due Date</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlain: {
    backgroundColor: '#E0E0E0',
  },
  avatarWithImage: {
    backgroundColor: '#FFE4C4',
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  expectingAnotherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  expectingAnotherText: {
    fontSize: 14,
    color: '#333',
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
    backgroundColor: '#fff',
    borderColor: '#333',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  genderSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 16,
  },
  areYouLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  genderCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  genderCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  genderCheckboxSelected: {
    backgroundColor: '#fff',
    borderColor: '#333',
  },
  genderLabel: {
    fontSize: 14,
    color: '#333',
  },
  dueDateSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  dueDateValue: {
    color: '#333',
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
