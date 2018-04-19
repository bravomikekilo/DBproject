
export function toQuery(obj){
    return Array.map(Object.entries(obj), (pair) => {
        pair.join('=');
    }).join('$');
}