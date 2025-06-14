import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Colors } from "../constants";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { getImage } from "../constants/images";

export const NavHeader = ({  title, showBackButton }:
    { 
        title: string
        showBackButton?: boolean,  }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            {showBackButton && (
                <Ionicons 
                    name="chevron-back" 
                    size={24} 
                    color="white" 
                    onPress={() => {
                        navigation.goBack();
                }}/>
            )}
            <Text style={styles.headerText}>{title}</Text>
        </View>
    )
}

export const IconHeader = (
    {title, imageName, onPressHandler}: {title: string, imageName: string, onPressHandler: ()=> {}}
) => {
    return (
        <View style={styles.iconHeader}>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity onPress={() => onPressHandler()} >
                <Image source={getImage(imageName)} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginLeft: 8
    },
    iconHeader: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    }
})