
export function toQuery(obj){
    return Array.map(Object.entries(obj), (pair) => {
        pair.join('=');
    }).join('$');
}

export function occupy2free(occu){
    const ret = []
    for(let i = 0; i < 8; ++i){
        if(!occu.includes(i)){
            ret.push(i);
        }
    }
    return ret;
}