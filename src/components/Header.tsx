import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
  
const Header: React.FC = () => {
    return (
        <Appbar.Header>
            <Appbar.Content 
                title="POKEMON APP"
                style={styles.header}
                titleStyle={styles.title} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        marginLeft: 0,
        backgroundColor: '#FFFF00',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold'
    }
});

export default Header;