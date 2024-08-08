"use strict"

module.exports = (err, req, res, next) => {
    console.error(err);  // Server logları için hata detaylarını yazdır.

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? "Internal Server Error" : err.message;

    return res.status(statusCode).send({
        error: true,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })  // Geliştirme ortamında stack trace bilgisini gönder.
    });
}
