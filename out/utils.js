"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static formatDate(timer, format = 'yyyy-MM-dd hh:mm:ss') {
        let timestamp = timer;
        if (/^\d{10}$/.test(timestamp)) {
            timestamp *= 1e3;
        }
        else if (/^\d{13}$/.test(timestamp)) {
            timestamp = parseInt(timestamp);
        }
        else {
            return '';
        }
        let time = new Date(timestamp);
        let o = {
            "M+": time.getMonth() + 1,
            "d+": time.getDate(),
            "h+": time.getHours(),
            "m+": time.getMinutes(),
            "s+": time.getSeconds(),
            "q+": Math.floor((time.getMonth() + 3) / 3),
            "S": time.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return format;
    }
}
exports.default = Utils;
//# sourceMappingURL=utils.js.map