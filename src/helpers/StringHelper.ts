export const contains = (str: string, query: string, caseSensitive: boolean = false): boolean => 
    caseSensitive 
        ? str.indexOf(query) !== -1 
        : str.toLowerCase().indexOf(query.toLowerCase()) !== -1;

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const toCamelCase = (str: string, upperCase: boolean = false): string =>
    upperCase 
        ? (str.charAt(0).toUpperCase() + str.slice(1)).replace(" ", "")
        : (str.charAt(0).toLowerCase() + str.slice(1)).replace(" ", "");
