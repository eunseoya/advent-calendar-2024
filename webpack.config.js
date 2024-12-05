const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
        new Dotenv({
            path: '.env', // Specify the path to your .env file
            systemvars: true, // Include system environment variables
        }),
    ],
};