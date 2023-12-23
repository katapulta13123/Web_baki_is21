const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const accessToken = 'vk1.a.ZTb2Gb1B7i9y8t1rFIlx_lvzbfq-aF1i_LwaJb9VfEbHbGrvIPmj07DY7eEF4r1JQ643JedWKcJppBBQjVtd4q1-b9JHuDifussj65FKnjoPXhaluaqTckLtRfNqH8MtD-DYCAfN1l-Wj4fyYLOZhq9qDnwFGHDBNL9Jva2XQYjNfpoZGLt_UC9FyQguzE5vWVV8-6P0owTTB2p3C5tHfw'
const groupId = 223900856
let UserInfo = null;
let Members = null;

async function fetchData(groupId) {
    try {
        const response = await axios.get('https://api.vk.com/method/groups.getMembers', {
            params: {
                group_id: groupId,
                fields: 'photo_400_orig',
                access_token: accessToken,
                filter: 'friends',
                v: '5.199'
            }
        });
        Members = response.data;
    } catch (error) {
        throw new Error('Ошибка при получении данных: ' + error.message);
    }
}
app.post('/get-members', async (req, res) => {
    try {
        await fetchData(groupId);
        res.json(Members || {});
    } catch (error) {
        res.status(500).send(error.message);
    }
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