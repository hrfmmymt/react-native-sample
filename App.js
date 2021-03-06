import React, { Component } from 'react'
import { StyleSheet, View, AppRegistry, Image, TextInput, ScrollView, ListView } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    )
  }
}

class Blink extends Component {
  constructor(props) {
    super(props)
    this.state = {showText: true}

    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText })
    }, 1000)
  }

  render() {
    let display = this.state.showText ? this.props.text : ' '
    return (
      <Text>{display}</Text>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      text: '',
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    }
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }
    return (
      <ScrollView style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <Button>
            <Text>
                Button
            </Text>
          </Button>
          <Image source={pic} style={{width: 193, height: 110}}/>
          <Greeting name='Rexxar' />
          <Greeting name='Jaina' />
          <Greeting name='Valeera' />
          <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={(text) => this.setState({text})}
          />
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
          <Blink text='I love to blink' />
          <Blink text='Yes blinking is so great' />
          <Blink text='Why did they ever take this out of HTML' />
          <Blink text='Look at me look at me look at me' />
          <Text style={styles.red}>just red</Text>
          <Text style={styles.bigblue}>just bigblue</Text>
          <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
          <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
          <View style={{width: 50, height: 50, backgroundColor: 'powderblue', flexDirection: 'row'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'skyblue', flexDirection: 'row'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'steelblue', flexDirection: 'row'}} />
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
})


// var request = new XMLHttpRequest();
// request.onreadystatechange = (e) => {
//   if (request.readyState !== 4) {
//     return;
//   }
//
//   if (request.status === 200) {
//     console.log('success', request.responseText);
//   } else {
//     console.warn('error');
//   }
// };
//
// request.open('GET', 'https://facebook.github.io/react-native/movies.json');
// request.send();

async function getMoviesFromApi() {
  try {
    let response = await fetch('https://facebook.github.io/react-native/movies.json')
    let responseJson = await response.json()
    console.log('success', responseJson.movies)
    return responseJson.movies
  } catch(error) {
    console.error(error)
  }
}

getMoviesFromApi()
