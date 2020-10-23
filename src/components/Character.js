import React from 'react';
import {View, ActivityIndicator, Pressable, Text, StyleSheet, FlatList} from 'react-native';
import Http from '../libs/http';
import CharacterItem from './CharacterItem';

class CoinsScreen extends React.Component{

    state ={
        characters:[],
        loading: false,
        next: null,
        prev: null,
    }

    componentDidMount = async ()=>{
        this.setState({loading:true});
        const res = await Http.instance.get('https://rickandmortyapi.com/api/character/');
        this.setState({characters: res.results, loading:false});
        if(res.info.next){
            this.setState({next:res.info.next });
        }
        if(res.info.prev){
            this.setState({prev:res.info.prev });

        }
    }

    handlePress = () =>{
        console.log('Go to detail ', this.props);
        //this.props.navigation.navigate('CoinDetail');
    }


    render(){
        
        const {characters, loading, next, prev} = this.state;
        return(
            <View style={styles.container}>
                {loading?
                <ActivityIndicator 
                    color='#000' 
                    size='large'
                    style={styles.loader}
                    >

                </ActivityIndicator>
                :null
                }
                <FlatList 
                    data={characters} 
                    renderItem={({item}) => <CharacterItem item={item}></CharacterItem> }>
                </FlatList>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    btn:{
        padding: 0,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16,
    },

    btnText:{
        color: '#fff',
        textAlign: 'center',
    },
    loader:{
        marginTop:70,
    },
});

export default CoinsScreen;
