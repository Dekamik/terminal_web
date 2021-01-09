export const contains = (str: string, query: string): boolean => str.toLowerCase().indexOf(query) !== -1;

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
