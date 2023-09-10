import React, {FC, useState, memo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export interface ITab {
  id: number;
  title: string;
  body: string | JSX.Element;
}

interface ITabsProps {
  tabs: Array<ITab>;
}

const Tabs: FC<ITabsProps> = ({tabs}) => {
  const [tab, setTab] = useState(0);

  return (
    <View style={styles.tabsWrapper}>
      <View style={styles.tabsLayout}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setTab(index)}
            style={[styles.tab, tab === index && styles.tabActive]}>
            <Text style={styles.tabText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.whiteSpace}>{tabs[tab].body}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabsLayout: {
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: '#5AC8FA',
  },
  tabText: {
    color: 'black',
  },
  whiteSpace: {
    width: '100%',
    padding: 15,
  },
});

export default memo(Tabs);
