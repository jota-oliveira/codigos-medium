import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Vibration } from 'react-native';
import moment from 'moment';

export default class App extends Component {

    state = {
        start: false,
        bombClock: {
            hours: '',
            minutes: '',
            seconds: ''
        },
        password: '',
        passwordSaved: '',
        message: '',
        status: 'Start'
    }

    countdownInterval = 0;

    startCountdown = () => {
        const explodeTime = moment();
        let seconds = this.state.bombClock.seconds ? this.state.bombClock.seconds : 0;
        let minutes = this.state.bombClock.minutes ? this.state.bombClock.minutes : 0;
        let hours = this.state.bombClock.hours ? this.state.bombClock.hours : 0;

        explodeTime
            .add(seconds, 'seconds')
            .add(minutes, 'minutes')
            .add(hours, 'hours');

        const currentTime = moment();
        let diffTime = explodeTime.unix() - currentTime.unix();
        let duration = moment.duration(diffTime * 1000, 'milliseconds');
        const interval = 1000;

        if(diffTime > 0) {
            this.countdownInterval = setInterval(() => {
                duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
                hours = moment.duration(duration).hours().toString();
                minutes = moment.duration(duration).minutes().toString();
                seconds = moment.duration(duration).seconds().toString();

                const bombClock = this.state.bombClock;
                bombClock.hours = hours.length === 1 ? '0'+hours : hours;
                bombClock.minutes = minutes.length === 1 ? '0'+minutes : minutes;
                bombClock.seconds = seconds.length === 1 ? '0'+seconds : seconds;

                if(bombClock.hours <= 0 && bombClock.minutes <= 0 && bombClock.seconds <= 0) {
                    clearInterval(this.countdownInterval);
                    Vibration.vibrate([100, 200, 300, 30000], true);
                    Vibration.cancel();
                }

                this.setState({ bombClock: bombClock });
            }, 1000);
        }

        return null;
    }

    bombActivation = () => {
        if(!this.state.password) {
            this.setState({ message: "Você precisa de alguma senha!" });
            return true;
        }

        let timeIsSet = false;
        for(let key in this.state.bombClock) {
            if(this.state.bombClock[key]) {
                timeIsSet = true;
            }
        }

        if(!timeIsSet) {
            this.setState({ message: "O relógio não foi definido" });
            return true;
        }

        if(this.state.start) {
            if(this.state.password === this.state.passwordSaved) {
                clearInterval(this.countdownInterval);
                this.setState({ start: false, status: 'Start', password: '', passwordSaved: '', message: 'Bomba desarmada!' });

                return true;
            }

            this.setState({ message: 'Senha errada, a bomba ainda está ativa' });
        } else {
            this.setState({ start: true, status: 'Stop', passwordSaved: this.state.password, password: '', message: 'Bomba ativada' });
            this.startCountdown();
            return true;
        }

        return true;
    }

    showMessages = () => this.state.message ? <Text style={styles.alertText}>{this.state.message}</Text> : null;

    setBombClock = (type, value) => {
        const bombClock = this.state.bombClock;

        bombClock[type] = value;
        this.setState({ bombClock: bombClock });
    }

    render = () => {
        return (
            <View style={styles.container}>
                { this.showMessages() }

                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Digite uma senha"
                    placeholderTextColor="rgb(73, 143, 255)"
                    onChangeText={(value) => this.setState({ password: value })}
                    value={this.state.password}
                />
                <View style={styles.viewClock}>
                    <TextInput
                        style={styles.inputTime}
                        placeholder="00"
                        placeholderTextColor="rgb(73, 143, 255)"
                        onChangeText={(value) => this.setBombClock('hours', value)}
                        value={this.state.bombClock.hours}
                        keyboardType={'numeric'}
                        maxLength={2}
                    />
                    <TextInput
                        style={styles.inputTime}
                        placeholder="00"
                        placeholderTextColor="rgb(73, 143, 255)"
                        onChangeText={(value) => this.setBombClock('minutes', value)}
                        value={this.state.bombClock.minutes}
                        keyboardType={'numeric'}
                        maxLength={2}
                    />
                    <TextInput
                        style={styles.inputTime}
                        placeholder="00"
                        placeholderTextColor="rgb(73, 143, 255)"
                        onChangeText={(value) => this.setBombClock('seconds', value)}
                        value={this.state.bombClock.seconds}
                        keyboardType={'numeric'}
                        maxLength={2}
                    />

                </View>

                <Button
                    onPress={() => this.bombActivation()}
                    title={this.state.status}
                    color="rgb(255, 95, 95)"
                    accessibilityLabel="Iniciar a bomba"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(95, 98, 104)',
    },

    input: {
        backgroundColor: 'rgb(0, 0, 0)',
        textDecorationLine: 'none',
        height: 50,
        width: 200,
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        color: 'rgb(73, 143, 255)',
        textAlign: 'center'
    },

    viewClock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    inputTime: {
        backgroundColor: 'rgb(0, 0, 0)',
        textDecorationLine: 'none',
        height: 100,
        width: 130,
        padding: 10,
        fontSize: 50,
        marginTop: 10,
        marginBottom: 10,
        color: 'rgb(73, 143, 255)',
        textAlign: 'center',
    },

    alertText: {
        color: 'rgb(73, 143, 255)',
        fontSize: 20
    }
});
