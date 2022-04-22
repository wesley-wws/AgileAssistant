const typeChecker = {
	isString(value:any):boolean{
        return typeof value === 'string' || value instanceof String;
    }
};

export default typeChecker;
