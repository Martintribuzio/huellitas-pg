export interface Post{
    img: string;
    description: string;
    state: string;
    date: string;
    type: string;
    genre: string;
}

export interface Input{
    state:string,
    img: any,
    description: string,
    type: string,
    genre: string,
    date: string
}


// export interface Dispatch<A extends Action = AnyAction> {HAY QUE HACER UNA INTERFAZ PARA DISPATCH
//     <T extends A>(action: T): T
//   }