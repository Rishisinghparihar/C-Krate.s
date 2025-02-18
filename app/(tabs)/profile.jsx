import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const profile = ({ name, email, photo, onEditPress }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={photo ? { uri: photo } : require('../../assets/images/icon.png')} 
                style={styles.profileImage} 
            />

            <Text style={styles.name}>{name || 'Your Name'}</Text>
            <Text style={styles.email}>{email || 'your.email@example.com'}</Text>

            <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
      justifyContent: 'flex-end',
        alignItems: 'center', 
        padding: 20, 
        backgroundColor: '#fff', 
        borderRadius: 10, 
        elevation: 5, 
        margin: 20 ,
        marginTop:200
    },
    profileImage: { 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        marginBottom: 15 
    },
    name: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#333' 
    },
    email: { 
        fontSize: 16, 
        color: '#666', 
        marginBottom: 10 
    },
    editButton: { 
        backgroundColor: '#007bff', 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 5 
    },
    editButtonText: { 
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold' 
    }
});

export default profile;
