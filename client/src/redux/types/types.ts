export interface PostType{
    description: string,
    genre: string,
    date: string,
    petImage: File | null | undefined | string,
    animal: string,
    postType: string,
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
