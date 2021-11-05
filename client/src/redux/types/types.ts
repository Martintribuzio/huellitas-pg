export interface PostType{
    name?:string,
    description: string,
    genre: string,
    date: string,
    petImage: File | null | undefined | string,
    type: string,
    state: string,
    _id?: string,
    latitude: number,
    longitude: number
}

export interface detailProps{
    id:string,
}

export interface Filters{
    state: string,
    type: string,
    genre: string
}