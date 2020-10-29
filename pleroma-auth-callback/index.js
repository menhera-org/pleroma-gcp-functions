
const {getAccessToken} = require('pleroma-easy-way');

/**
 * 
 * @param {string} headerValue ]
 * @returns {object}
 */
const getCookies = headerValue => {
    const cookies = Object.create(null);
    const fields = String(headerValue || '').split('; ');
    for (const field of fields) {
        const matches = field.match(/^([^=]+)=(.*)$/);
        if (!matches) continue;
        cookies[matches[1]] = matches[2];
    }
    return cookies;
};

exports.authCallback = async (req, res) => {
    try {
        const {domain, clientId, clientSecret} = getCookies(req.headers.cookie);
        const result = await getAccessToken(domain, clientId, clientSecret, req.query.code);
        res.status(200).json({
            success: true,
            error: null,
            result,
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            error: e,
            result: null,
        });
    }
};
