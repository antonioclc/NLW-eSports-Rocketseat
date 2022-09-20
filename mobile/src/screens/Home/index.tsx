import { useState, useEffect } from 'react';
import { Image, FlatList } from 'react-native';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation();

  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch('http://192.168.0.107:3000/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, []);

  function handleOpenGame({id, name, bannerUrl}: GameCardProps) {
    navigation.navigate('game', {id, name, bannerUrl});
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...'></Heading>
        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => <GameCard onPress={() => handleOpenGame(item)} data={item}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}