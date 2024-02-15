export const config = {
    API_URL: '',
    JWT_KEY: 'JWT-KEY',
    USER_KEY: 'USER-KEY',
    CLIENT_ID: '',
    CALLBACK_URL: 'https://localhost:4200/callback',
    GITHUB_OAUTH2: function () {
        return `https://github.com/login/oauth/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${this.CALLBACK_URL}`
    }
};

