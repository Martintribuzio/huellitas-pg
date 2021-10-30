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

export interface detailProps{
    id:string,
}