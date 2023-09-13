import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AppText from '../../AppText';

export default function HomeMain(props: any) {

    const notices = [
        { id: 1, title: '공지사항 1을 확인해주세요', date: '2023.08.17' },
        { id: 2, title: '공지사항 2를 확인해주세요', date: '2023.08.16' },
        { id: 3, title: '공지사항 3을 확인해주세요', date: '2023.08.15' },
      ];
  
    const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  
    const moveToNextNotice = () => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    };
  
    useEffect(() => {
      const timer = setInterval(moveToNextNotice, 3000);
      return () => clearInterval(timer);
    }, []);
  
    return (
      <View style={styles.noticeContainer}>
        <Image source={require('../images/home/noticeicon.png')} style={styles.noticeIcon}/>
        <View style={styles.noticeContent}>
          <AppText style={styles.noticeText}>
            {notices[currentNoticeIndex].title}
          </AppText>
          <AppText style={styles.noticeDate}>
            {notices[currentNoticeIndex].date}
          </AppText>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    noticeContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#F5F5F5'
    },
    noticeIcon: {
      margin: 10,
      width: 22,
      height: 23
    },
    noticeContent: {
      flex: 1,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    noticeText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    noticeDate: {
      color: 'gray',
      fontSize: 12,
    },
  });