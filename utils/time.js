export function formatTimeDifference(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day; // 近似一个月为30天
    
    if (diff < minute) {
        return "1分钟";
    } else if (diff < hour) {
        return `${Math.floor(diff / minute)}分钟`;
    } else if (diff < day) {
        return `${Math.floor(diff / hour)}小时`;
    } else if (diff < month) {
        return `${Math.floor(diff / day)}天`;
    } else {
        return `${Math.floor(diff / month)}个月`;
    }
}


