import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import ListaItem from './Components/ListaItem';
import results from './Components/results';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results);

  //o useEffect vai monitorar a inserção de texto no campo de busca (searchText). Quando digitar na busca, o useEffect vai salvar
  //essas infos em searchText e em seguida filtrar na lista

  useEffect(() => {
    if (searchText === '') {
      //se o campo de busca estiver vazio, ele me mostra a lista completa, bruta (results)
      setList(results);
    } else {
      setList(
        //todo filtro tem que ser baseado na lista inteira
        results.filter(item => {
          if (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            //quando o indexOf não acha o item, ele retorna -1, por isso a verificação. Se for > que -1 quer dizer q ele achou
            return true; //pega o item especifico e joga ele no filtro (list)
          } else {
            return false;
          }
        }),
      );
    }
  }, [searchText]); // => é quem eu quero observar

  const handleOrderClick = () => {
    //old:criar uma copia da lista original(result) para ai sim fazer o sort, pois o sort modifica o array original
    //em seguida coloca a copia na lista dinamica (list).
    //new: ps: ao inves de criar uma copia de result, o ideal é criar uma copia de list, pois se estiver filtrado, a classificação vai conseguir ser pelo filtro, e não pela lista inteira.
    let newList = [...list];

    newList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    // newList.sort((a, b) => {//recebo o item do meu loop e o proximo item(Atual e o proximo)
    //   if(a.name > b.name) {
    //     return 1 // para subir
    //   } else {
    //     if (b.name > a.name) {
    //       return -1 // para descer
    //     } else {
    //       return 0; //se mantem
    //     }
    //   }
    // });

    setList(newList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Buscar Pessoa"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={t => setSearchText(t)} //quando mudar o texto, ele ja salva no state setSearchText
        />

        <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
          <Text style={{color: 'white', fontWeight: 'bold'}}> -AZ</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list} //são os dados, um arquivo que tem um array com as infos. Ao inves de inserir o {results} é criado um state para ele ser dinamico, e poder ser alterado.
        style={styles.list}
        renderItem={({item}) => <ListaItem data={item} />} //cada pessoa é um componente desse ListaItem
        keyExtractor={item => item.id}
      />
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242425',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#363636',
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#FFFFFF',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  list: {
    flex: 1,
  },
});
