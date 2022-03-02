module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": ["off"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "eol-last": ["error", "always"],
        "no-unused-vars": "warn",
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "no-case-declarations": "off"
    }
};
