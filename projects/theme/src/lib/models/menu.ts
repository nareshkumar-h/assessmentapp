enum Type { link, sub }

export interface Menu {
    path:string[];
    title:string;
    type:Type;
    icontype:string;    
    children:Menu[]
}
