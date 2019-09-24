import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, AsyncStorage } from 'react-native';
const axios = require('axios')

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false
  }

  storeData = (user) => {
    try {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      // Error saving data
    }
  };


  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  }

  handlerSubmit = () => {
    let url = 'https://api.codenation.dev/v1/user/auth'
    this.setState({ loading: true })
    axios.post(url, {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        this.storeData(response.data)
        this.setState({ loading: false })
        navigation.navigate('Acceleration')
      }).catch(error => {
        console.log(error)
        this.setState({ loading: false })
      })
  }

  render() {
    const { email, password } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image className="header-image"
            style={styles.headerImage}
            source={{ uri: 'https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png' }}
          />
        </View>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.lblEmail}>E-mail:</Text>
        <TextInput className="email-input"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(text) => this.validate(text, 'email')}
          placeholder="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={text => this.setState({ email: text })}
          returnKeyType="next"
        />
        <Text style={styles.lblPassword}>Senha:</Text>
        <TextInput className="password-input"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Password"
          autoCompleteType="password"
          secureTextEntry={true}
          textContentType="password"
          style={styles.input}
          value={password}
          onChangeText={text => this.setState({ password: text })}
          returnKeyType="send"
        />
        <Button
          title="Entrar"
          color="#7800ff"
          disabled={(this.validateEmail(this.state.email) && !!this.state.password.length) || this.state.loading === true}
          onPress={()=> this.handlerSubmit()}
        >
        </Button>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#7800ff',
    borderBottomWidth: 2,
    padding: 16,
    paddingTop: 55
  },
  headerImage: {
    height: 45,
    width: 250
  },
  input: {
    height: 43,
    fontSize: 14,
    fontWeight: '800',
    paddingLeft: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 6,
    backgroundColor: '#7800ff',
    marginTop: 24
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  lblEmail: {
    color: '#7800ff',
    marginLeft: 10
  },
  lblPassword: {
    color: '#7800ff',
    marginLeft: 10
  }
});
