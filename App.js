import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { fetchAllData } from './database';
import { createTable, insertData } from './database';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAllData((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    createTable();
    insertData('เลี้ยงไก่', 15);
    insertData('เลี้ยงปลานิล', 20);
    fetchAllData((data) => {
      setData(data);
    });
  }, []);

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:25,fontWeight:'800'}}>หน้าเเสดงกราฟของการลงทุน</Text>
      {data.length > 0 ? (
        <VictoryChart
          theme={VictoryTheme.grayscale}
          domainPadding={{ x: 20 }}
        >
         <VictoryBar
            data={data}
            x="label"
            y="value"
            style={{
              data: {
                fill: ({ datum }) => generateRandomColor(),
              },
            }}
          />
        </VictoryChart>
      ) : (
        <Text>No data available</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
