const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const supabase = require('./database/db');
dotenv.config();

const port = process.env.PORT || 4003;
const app = express();
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
));
// req.body req.query req.params
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', express.static('public'));
app.use(cookieParser('keyboard cat'));
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use('/api', require('./routes/api'));

app.get('/oauth/login', async (req, res) => {
        const {code} = req.query;

        try {
            const tokenRes = await axios.post(
                'https://kauth.kakao.com/oauth/token',
                null,
                {
                    params: {
                        grant_type: 'authorization_code',
                        client_id: process.env.KAKAO_CLIENT_ID,
                        redirect_uri: process.env.KAKAO_REDIRECT_URI,
                        code,
                        client_secret: process.env.KAKAO_CLIENT_SECRET,
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                });
            // console.log(tokenRes);
            const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${tokenRes.data.access_token}`,
                },
            });
            // console.log(userRes);

            const {nickname, profile_image, thumbnail_image} = userRes.data.properties;
            const email = userRes.data.kakao_account.email;

            console.log(nickname);
            console.log(profile_image);
            console.log(thumbnail_image);

            req.session.user = {
                nickname,
                profile_image,
                thumbnail_image,
                id:email,
            };
            res.redirect('http://localhost:5173/login/success');

        } catch (err) {
            console.log(err);
            res.status(500).json('err');
        }
    }
)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
