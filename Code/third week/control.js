const firebaseConfig = {
    apiKey: "AIzaSyAilfSZNhweAifM9ZX2v0opCpnOaQzolXM",
    authDomain: "iot-lab-firebase-6fe5e.firebaseapp.com",
    projectId: "iot-lab-firebase-6fe5e",
    storageBucket: "iot-lab-firebase-6fe5e.firebasestorage.app",
    messagingSenderId: "879809584711",
    appId: "1:879809584711:web:a55ad74b4a16c64e931b62",
    databaseURL: "https://iot-lab-firebase-6fe5e-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function toggleLight(deviceId, isOn) {
    const img = document.getElementById(deviceId);
    if (isOn) {
        img.src = './lighton.png';
    } else {
        img.src = './lightoff.png';
    }
    updateFirebase(deviceId, isOn);
}

function updateFirebase(deviceId, state) {
    const deviceRef = firebase.database().ref("devices/" + deviceId);
    deviceRef.set({
        status: state ? 'on' : 'off'
    }).then(() => {
        console.log(`State of ${deviceId} updated to ${state ? 'on' : 'off'}`);
    }).catch((error) => {
        console.error("Error updating state: ", error);
    });
}

['bulb1', 'bulb2', 'bulb3', 'bulb4'].forEach(deviceId => {
    const deviceRef = firebase.database().ref("devices/" + deviceId);
    deviceRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            const state = snapshot.val().status === 'on';
            toggleLight(deviceId, state);
        }
    }).catch((error) => {
        console.error("Error fetching initial state: ", error);
    });
});
function updateTemperatureAndHumidity(temperature, humidity) {
    const sensorRef = firebase.database().ref("sensorData");
    sensorRef.set({
        temperature: temperature,
        humidity: humidity
    }).then(() => {
        console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}% updated successfully.`);
    }).catch((error) => {
        console.error("Error updating sensor data: ", error);
    });
}

updateTemperatureAndHumidity(37, 65);

function displayTemperatureAndHumidity() {
    const sensorRef = firebase.database().ref("sensorData");
    sensorRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('temperature').textContent = data.temperature;
            document.getElementById('humidity').textContent = data.humidity;
        }
    });
}

displayTemperatureAndHumidity();

