import React from "react";
import { Button, View, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import styles from '../../constants/screens/org-onboarding-styles/TellAboutOrg.js';

const TellAboutOrganizationScreen = (props) => {
    return (
        <KeyboardAvoidingView style={styles.obBody} behavior="height" keyboardVerticalOffset={86} enabled>
            <ScrollView>
            <Text style={styles.obTitle}>Tell us about your organization.</Text>
            <Text style={styles.obText}>We will want to make sure we can autosave your progress. So first things first: let's get you some login credentials.</Text>
            <Text style={styles.obFieldName}>Organization Name</Text>
            <TextInput style={styles.obTextInput} />
            <Text style={styles.obFieldName}>Organization Address</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>Organization Country</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>Organization Phone</Text>
            <TextInput style={styles.obTextInput}/>
            <Text style={styles.obFieldName}>Website URL</Text>
            <TextInput style={styles.obTextInputBottom}/>
            <TouchableOpacity style={styles.obFwdContainer}
                onPress={() => {
                    props.navigation.navigate("VerifyOrganization")
                }}
            >
                <Text style={styles.obFwdBtnText}>Next</Text>
            </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
 export default TellAboutOrganizationScreen;

//  const styles = StyleSheet.create({
//      inputfield: {
//         borderColor: "black",
//         borderWidth: 1
//      }
//  })