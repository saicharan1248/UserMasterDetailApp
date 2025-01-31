log(methodName, req) {
    if (arguments.length < 2) return logger[arguments[0]]('Insuffient log entry.');
    if (arguments.length === 2) return logger[arguments[0]](this.formatLog(null, arguments[1]));
    
    const logArr = Array.from(arguments).slice(2).map(arg => {
        if (!arg || typeof arg !== 'object' || Array.isArray(arg)) 
            return typeof arg === 'string' ? this.cleanLogString(arg) : arg;
        
        if (arg instanceof Error) {
            const stack = arg.stack.replace(':', '="') + '"',
                  [err, errMsg] = stack.split(':');
            return `${err}="${this.cleanLogString(errMsg)}"`;
        }
        
        return Object.entries(this.cleanByName(JSON.stringify(arg)))
            .map(([key, val]) => `${key}=${typeof val === 'object' ? 
                JSON.stringify(val) : `"${this.cleanLogString(val)}"`}`)
            .join(' ');
    });
    
    logger[arguments[0]](this.formatLog(arguments[1], logArr.join(' ')));
}