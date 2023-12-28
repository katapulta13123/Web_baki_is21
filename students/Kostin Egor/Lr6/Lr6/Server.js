const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const accessToken = 'vk1.a.wCUFqT_tt-BQ9CjSKXPPDfoPDJnUYESPhfJ_bcN8nN2Op2Z3PL-mOflE_KR9fBcLzOEkJlj7f5Qia2xOwUyXBzSG07gJzFeMDUylsxntkY3EuusnJr3MVsAVftEoF2-AJkUqQliv60oR-JOTmtCPnj3dKEtVhgdti__4rRbSpvVlHQVhmoIXedJw8NXalF43HMXhQkaTqwsRiSABRjZEKg';
let peerID = 2000000001
let conversationMembers = null;
let UserInfo = null;

async function fetchData(peerId) {
    if (!peerId || isNaN(peerId)) {
        throw new Error('Некорректный peerId');
    }

    try {
        const response = await axios.get('https://api.vk.com/method/messages.getConversationMembers', {
            params: {
                peer_id: peerID,
                fields: 'photo_400_orig',
                access_token: accessToken,
                v: '5.131'
            }
        });
        conversationMembers = response.data;
    } catch (error) {
        throw new Error('Ошибка при получении данных: ' + error.message);
    }
}

app.post('/get-members', async (req, res) => {
    try {
        await fetchData(peerID);
        res.json(conversationMembers || {});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/update-members', async (req, res) => {
    try {
        const peerId = parseInt(req.query.peerId);
        await fetchData(peerId);
        res.send('Данные обновлены для peerId: ' + peerId);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.get('/update-peer', (req, res) => {
    peerID = (peerID === 2000000001) ? 2000000002 : 2000000001;
    res.send('Peer ID обновлён на: ' + peerID);
});

async function fetchData2(userId) {
    try {
        const response = await axios.get('https://api.vk.com/method/users.get', {
            params: {
                user_ids: userId,
                fields: 'photo_400_orig,status',
                access_token: accessToken,
                filter: 'friends',
                v: '5.199'
            }
        });
        UserInfo = response.data;
    } catch (error) {
        throw new Error('Ошибка при получении данных: ' + error.message);
    }
}

app.post('/get-userInfo', async (req, res) => {
    try {
        const { userId } = req.query;
        await fetchData2(userId);
        res.json(UserInfo || {});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
