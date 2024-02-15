let a = "Me llamo "
let b = "Juan"
let c = ", "
let d = "buenos días"
let e = [a,b,c,d];
let f = function(name, greeting){
    e[1] = name;
    e[3] = greeting;
    return e;
}
let g;

/*for (let i = 0, e.length, i++){
    g += e.i;
}*/