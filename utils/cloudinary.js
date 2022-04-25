const cloudinary = require("cloudinary").v2
const config = require("config")

cloudinary.config({
    cloud_name: config.get('cloudinary-cloud-name'),
    api_key: config.get('cloudinary-api-key'),
    api_secret: config.get('cloudinary-api-secret'),
})

module.exports = cloudinary