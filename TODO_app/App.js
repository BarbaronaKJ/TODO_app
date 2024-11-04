import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Add new task / edit task
  const handleAddEditTask = () => {
    if (editingTask !== null) {
      setTasks(
        tasks.map((task, index) => 
          index === editingTask ? taskInput : task
        )
      );
      setEditingTask(null);
    } else {
      setTasks([...tasks, taskInput]);
    }
    setTaskInput('');
  };

  // Edit task
  const handleEditTask = (index) => {
    setTaskInput(tasks[index]);
    setEditingTask(index);
  };

  // Delete task
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Search for tasks
  const filteredTasks = tasks.filter(task =>
    task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TODO App</Text>
      <Text style={styles.header2}>By Kenth Jonard B. Barbarona | BSIT-3R13</Text>
      
      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        placeholderTextColor="#ffffff"
        value={searchTerm}
        onChangeText={setSearchTerm}

      />

      {/* Task Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        placeholderTextColor="#ffffff"
        value={taskInput}
        onChangeText={setTaskInput}
      />

      {/* Add/Edit Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddEditTask}>
        <Text style={styles.buttonText}>{editingTask !== null ? 'Edit' : 'Add'} Task</Text>
      </TouchableOpacity>

      <Text style={styles.header3}>Task List:</Text>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item}</Text>
            <TouchableOpacity onPress={() => handleEditTask(index)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTask(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flex: 1,
    padding: 20,
    backgroundColor: '#333333',
    marginTop: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  header2: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ffffff'
  },
  header3: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#000000',
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#7300ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    marginBottom: 5,
  },
  taskText: {
    flex: 1,
  },
  editText: {
    color: 'blue',
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
  },
});

export default App;
