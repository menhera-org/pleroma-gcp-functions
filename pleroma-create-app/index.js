
const {createApp} = require('pleroma-easy-way');

const AUTH_CALLBACK = 'https://asia-northeast1-menhera-org.cloudfunctions.net/pleroma-auth-callback';

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.createApp = async (req, res) => {
    try {
        const {clientId, clientSecret, consentUrl} = await createApp(req.query.domain, AUTH_CALLBACK, req.query.appName);
        res.cookie('clientId', clientId, {});
        res.cookie('clientSecret', clientSecret, {});
        res.cookie('domain', req.query.domain, {});
        res.redirect(consentUrl);
    } catch (e) {
        res.status(400).json({
            success: false,
            error: e,
            result: null,
        });
    }
};
