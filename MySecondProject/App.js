import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Calendar } from 'react-native-calendars';

export default function App() {
	const [exams, setExams] = useState([]);
	const [selectedDate, setSelectedDate] = useState('');

	useEffect(() => {
		// Fetch exam schedule from an API or local storage
		const fetchedExams = [
			{ date: '2024-02-20', subject: 'Math' },
			{ date: '2024-02-22', subject: 'Science' },
			{ date: '2024-02-25', subject: 'History' },
		];
		setExams(fetchedExams);
	}, []);

	useEffect(() => {
		if (exams.length > 0) {
			exams.forEach((exam) => {
				scheduleNotification(exam);
			});
		}
	}, [exams]);
	const scheduleNotification = async (exam) => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Upcoming Exam',
				body: `You have an exam for ${exam.subject} tomorrow!`,
			},
			trigger: {
				seconds: 60 * 60 * 24, // 24 hours before the exam
			},
		});
	};

	const handleDayPress = (day) => {
		setSelectedDate(day.dateString);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Exam Schedule</Text>
			<Calendar
				onDayPress={handleDayPress}
				markedDates={{
					[selectedDate]: { selected: true, selectedColor: 'blue' },
				}}
			/>
			<Text style={styles.selectedDate}>
				Selected Date: {selectedDate ? selectedDate : 'Please select a date'}
			</Text>
			<Text style={styles.examListHeader}>Exams for selected date:</Text>
			{exams.map((exam, index) => (
				<Text key={index} style={styles.exam}>
					{exam.date} - {exam.subject}
				</Text>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	selectedDate: {
		marginTop: 20,
		marginBottom: 10,
	},
	examListHeader: {
		marginTop: 20,
		marginBottom: 10,
		fontSize: 18,
		fontWeight: 'bold',
	},
	exam: {
		fontSize: 16,
		marginBottom: 5,
	},
});
