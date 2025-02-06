import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Morning',
    data: [
      'Fixing Bed',
      'BreakFast',
      'Clean the house.',
      'Prepare things for school.',
      'Take a bath',
      'Cook food for pets',
      'Prepare the food for pets',
      'Go to School',
    ],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Afternoon',
    data: [
      'Eat Lunch',
      'Study',
      'Rest',
      'Scroll to phone',
      'Do the activities or assignments',
      'Ready to go back home',
      'Fix the house',
      'Eat Supper',
    ],
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Evening',
    data: [
      'Ready for Dinner',
      'Cook Dinner',
      'Feed the Pets.',
      'Eat Dinner.',
      'Wash the dishes',
      'Clean the table ',
      'Clean the kitchen',
      'Clean the body',
      'Ready to Sleep',
    ],
  },
];

const App = () => {
  const [tasks, setTasks] = useState(
    DATA.map((section) => ({
      ...section,
      data: section.data.map((item) => ({
        title: item,
        checked: false,
      })),
    }))
  );

  const [doneCount, setDoneCount] = useState(0);
  const [notDoneCount, setNotDoneCount] = useState(0);

  const toggleCheckbox = (sectionIndex, itemIndex) => {
    const newTasks = [...tasks];
    newTasks[sectionIndex].data[itemIndex].checked =
      !newTasks[sectionIndex].data[itemIndex].checked;
    setTasks(newTasks);
  };

  useEffect(() => {
    let done = 0;
    let notDone = 0;

    tasks.forEach((section) => {
      section.data.forEach((item) => {
        if (item.checked) {
          done += 1;
        } else {
          notDone += 1;
        }
      });
    });

    setDoneCount(done);
    setNotDoneCount(notDone);
  }, [tasks]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <Text style={styles.mainHeader}>TULOD To Do List</Text>
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Done: {doneCount}</Text>
          <Text style={styles.counterText}>Not Done: {notDoneCount}</Text>
        </View>
        <SectionList
          sections={tasks}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, section, index }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleCheckbox(tasks.indexOf(section), index)}>
                {item.checked && <Text style={styles.checkboxText}>✓</Text>}
              </TouchableOpacity>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  mainHeader: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5cd1c3',
    padding: 20,
    marginVertical: 8,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 16,
  },
  header: {
    fontSize: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    flex: 1,
  },
});

export default App;