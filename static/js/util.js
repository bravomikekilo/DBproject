
export function toQuery(obj){
    const terms = Array.map(Object.entries(obj), pair => pair.join('='));
    return `?${terms.join('&')}`;
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