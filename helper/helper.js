const path = require("path");
const uuid = require("uuid").v4;

module.exports = {
    success: function(res, message = "", body = {}) {
        return res.status(200).json({
            success: true,
            status: 200,
            message: message,
            body: body
        });
    },
    failure: function(res, message = "", body = {}) {
        return res.status(400).json({
            success: false,
            status: 400,
            message: message,
            body: body
        });
    },
    error: function(res, message = "", body = {}) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: message,
            body: body
        });
    },
    fileUpload: async (file) => {
        if (!file) return null;
        const extension = path.extname(file.name);
        const filename = uuid() + extension;
        const filePath = path.join(process.cwd(), 'public', 'images', filename);
        try {
            await new Promise((resolve, reject) => {
                file.mv(filePath, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            return `/images/${filename}`;
        } catch (error) {
            console.error('Error moving file:', error);
            throw new Error('Error uploading file');
        }
    },  
    checkValidation: async (v) => {
        try {
            const matched = await v.check();
            if (!matched) {
                const errorMessages = Object.values(v.errors).map(error => error.message);
                return errorMessages.length > 0 ? errorMessages[0] : 'Validation failed.';
            }
            return ''; 
        } catch (error) {
            console.error('Validation error:', error);
            return 'An unexpected error occurred during validation.';
        }
    },    
    checkAdminSession :async (req, res, next) => {
        try {
            if (!req.session.admin) {
                return res.redirect('/login');
            } else {
                res.locals.admin = req.session.admin
                next();
            }
        } catch (error) {
            return res.redirect('/login');
        }}

};
