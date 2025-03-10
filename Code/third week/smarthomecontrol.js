const firebaseConfig = {
    apiKey: "AIzaSyDlCEDODYCS-EHfBK3-8DI_cWltdMqCiGo",
    authDomain: "iotlab67-83c06.firebaseapp.com",
    databaseURL: "https://iotlab67-83c06-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iotlab67-83c06",
    storageBucket: "iotlab67-83c06.appspot.com",
    messagingSenderId: "924334337098",
    appId: "1:924334337098:web:ee1fce21ca61636bdbcab3"
};

firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref('devices');

function showRooms(room) {
    const roomsRef = firebase.database().ref('rooms/' + room);
    roomsRef.set({ roomName: room });
    window.location.href = './index.html';
}

function toggleDevice(element) {
    let device = element.closest(".device");
    let statusText = device.querySelector(".status");
    if (element.checked) {
        statusText.textContent = "On";
        device.classList.remove("highlight");
    } else {
        statusText.textContent = "Off";
        device.classList.add("highlight");
    }
}

document.querySelectorAll('.room').forEach((room) => {
    room.addEventListener('click', () => {
        const roomName = room.getAttribute('data-room-name');
        showRooms(roomName);
    });
});

document.querySelectorAll('.switch input').forEach((input) => {
    input.addEventListener('change', (e) => {
        const deviceId = e.target.closest('.device').getAttribute('data-device-id');
        const status = e.target.checked ? 'On' : 'Off';
        updateDeviceStatus(deviceId, status);
    });
});

function updateDeviceStatus(deviceId, status) {
    dbRef.child(deviceId).update({ status });
}

dbRef.on('value', (snapshot) => {
    const devices = snapshot.val();
    if (devices) {
        Object.keys(devices).forEach((deviceId) => {
            const device = document.querySelector(`.device[data-device-id="${deviceId}"]`);
            if (device) {
                const status = devices[deviceId].status;
                device.querySelector('.status').textContent = status;
                device.querySelector('.switch input').checked = status === 'On';
            }
        });
    }
})

roomsRef.on('value', (snapshot) => {
    const rooms = snapshot.val();
    if (rooms) {
        Object.keys(rooms).forEach((roomId) => {
            const roomName = rooms[roomId].roomName;
            console.log('Room: $(roomName');
        });
    }
}
)