
const {postStatus} = require('pleroma-easy-way');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.postStatus = async (req, res) => {
    try {
        const result = await postStatus(req.query.domain, req.query.accessToken, req.query.status, req.query.visibility);
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
