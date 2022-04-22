import typeChecker from './typeChecker';

const localCache = {
	get lastUserName(): string {
		return localStorage.getItem('aga-localcache-lastusername') ?? '';
	},
	set lastUserName(name: any) {
		if (!typeChecker.isString(name)) {
			return;
		}
		localStorage.setItem('aga-localcache-lastusername', name);
	},
};

export default localCache;
