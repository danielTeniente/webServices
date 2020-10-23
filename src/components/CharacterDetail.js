import React from 'react';
import {View, ActivityIndicator, Text, Pressable, StyleSheet, Image} from 'react-native';
import Http from '../libs/http';

class CharacterDetail extends React.Component{

    state={
        loading: false,
        character: null
    }

    componentDidMount = async ()=>{
        this.setState({loading:true});
        const res = await Http.instance.get(this.props.route.params.character_url);
        this.setState({loading:false, character: res});
    }

    render(){
        const {character, loading} = this.state;
        return(
            <View>
                {loading?
                <ActivityIndicator 
                    color='#000' 
                    size='large'
                    style={styles.loader}
                    >
                </ActivityIndicator>
                :null
                }                
                {character?
                    <View style={styles.container}>
                        <Image source={{uri:character.image}}
                        style={styles.image}></Image>
                        <View style={styles.description}>
                            <Text style={styles.text}>Name: {character.name}</Text>
                            <Text style={styles.text}>Gender: {character.gender}</Text>
                            <Text style={styles.text}>Specie: {character.species}</Text>
                            <Text style={styles.text}>Origin Location: {character.origin.name}</Text>
                            <Text style={styles.text}>Current location: {character.location.name}</Text>
                        </View>
                    </View>
                :null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height: '100%',
        backgroundColor: '#67dd23',
        alignItems:'center'
    },
    description:{
        padding:20,
        marginTop:20,
        backgroundColor: '#000',
        width:'100%'
    },
    loader:{
        marginTop:10,
    },
    image: {
        marginTop:20,
        width: '80%',
        height: '50%',
    },
    text:{
        fontSize: 17,
        color: '#53eae3'
    }
});
export default CharacterDetail;
