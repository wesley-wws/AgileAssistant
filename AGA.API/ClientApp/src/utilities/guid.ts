const guid = {
    create: function (): string {
        var cryptoObj: any = window.crypto || (window as any).msCrypto;
        if (typeof cryptoObj === 'object') {
            if (typeof cryptoObj.randomUUID === 'function') {
                // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
                return cryptoObj.randomUUID();
            }
            if (typeof cryptoObj.getRandomValues === 'function' && typeof Uint8Array === 'function') {
                // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
                const callback = (c:any) => {
                    const num = Number(c);
                    return (num ^ (cryptoObj.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
                };
                return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, callback);
            }
        }

		var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
		});
	},
};

export default guid;
