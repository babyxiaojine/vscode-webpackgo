import * as vscode from 'vscode';
export default class Utils {
    static formatDate(timer:string | number, format:string = 'yyyy-MM-dd hh:mm:ss'):string {
		let timestamp:any = timer;
		if (/^\d{10}$/.test(timestamp)) {
		  timestamp *= 1e3;
		} else if (/^\d{13}$/.test(timestamp)) {
		  timestamp = parseInt(timestamp);
		} else {
		  return '';
		}
		let time = new Date(timestamp);
		let o:any = {
		  "M+": time.getMonth() + 1,                 //月份 
		  "d+": time.getDate(),                    //日 
		  "h+": time.getHours(),                   //小时 
		  "m+": time.getMinutes(),                 //分 
		  "s+": time.getSeconds(),                 //秒 
		  "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
		  "S": time.getMilliseconds()             //毫秒 
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

	static getActiviteTerminal(name:string){
		const terminals = vscode.window.terminals;
		return terminals.find((item) => {
			return item.name === name;
		})
	}
}