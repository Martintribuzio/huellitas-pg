export interface PostType{
    name?:string,
    description: string,
    genre: string,
    date: string,
    petImage: File | null | undefined | string,
    type: string,
    state: string,
    _id?: string
}

export interface Input{
    state:string,
    description: string,
    type: string,
    genre: string,
    date: string,
    petImage: File | null | undefined | string,
    animal: string, 
    postType: string,
    _id?: string
}

