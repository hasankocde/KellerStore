// chatMessage.js
const moment = require('moment');

/**
 * formatMessage - Mesaj bilgilerini içeren bir obje döndürür.
 * @param {object} data - Mesajla ilgili verileri içeren obje.
 * @returns {object} - Formate edilmiş mesaj objesi.
 */
const formatMessage = (data) => {
    // msg objesini const ile tanımlayarak, değişkenin yeniden atanmasını engelliyoruz.
    const msg = {
        from: data.fromUser,
        to: data.toUser,
        message: data.msg,
        date: moment().format("YYYY-MM-DD"),
        time: moment().format("hh:mm a")
    };
    return msg;
}

module.exports = formatMessage;
