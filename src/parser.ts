export interface FilterResult {
    column: string;
    condition: string;
    values: (string | number) | (string | number)[];
    filterType?: string;
}

export interface MultiFilterResult {
    filters: FilterResult[];
    operators: ('and' | 'or')[];
}

export function parameterSpliter(url:string): string[] {
    const parts = url.split("&");

    if (parts.length < 2){return;}

    return parts.slice(1)
}


export function extractFilterComponents(query: string): FilterResult {
    const regex = /^\s*([\w]+)\s+(in|is|notin|lessthan|lessthanorEqual|greaterthan|greaterthanorequal|contains|doesnotcontain|startswith|doesnotstartwith)\s*(\((.*?)\)|'([^']*)'|(\S+))\s*$/i;
    const match = query.match(regex);

    if (!match) {
        throw new Error("Formato de filtro inválido");
    }

    const column = match[1];
    const condition = match[2]
    let filterType: string;

    // tipo de filtro para api
    if (["In", "NotIn"].includes(condition) ){
        filterType = "Basic";
    }else{
        filterType = "Advanced";
    };

    let values: (string | number) | (string | number)[];

    if (match[4] !== undefined) {
        // Maneja listas: (valor1, valor2, ...)
        values = match[4].split(/,\s*/).map(val => {
            const trimmedVal = val.trim();
            // Remueve comillas y verifica si es número
            if (/^'(.*)'$/.test(trimmedVal)) {
                return trimmedVal.slice(1, -1);
            }
            const num = Number(trimmedVal);
            return isNaN(num) ? trimmedVal : num;
        });
    } else if (match[5] !== undefined) {
        // Valor entre comillas simples (string)
        values = match[5];
    } else if (match[6] !== undefined) {
        // Valor sin comillas (número o string)
        const trimmedVal = match[6].trim();
        const num = Number(trimmedVal);
        values = isNaN(num) ? trimmedVal : num;
    } else {
        throw new Error("Formato de valor no reconocido");
    }

    return {column, condition, values, filterType};
}


export class urlParser {
    private url: string;
    private parameters: { [key: string]:FilterResult };

    constructor (url:string){
        this.url = decodeURIComponent(url);
        this.parameters = {};
        this.parseUrl();
    }
    
    public parseUrl(){
        const params = parameterSpliter(this.url);
        if (params === undefined){
            console.log("no hace nada")
        }else{
            params.forEach((param) => {
                const valor = extractFilterComponents(param);
                this.parameters[valor.column] = valor;
            });
        };
        
    }

    public getParameter(parameterName:string){
        return this.parameters[parameterName] !== undefined ? this.parameters[parameterName] : null;
    }

}