export interface ModelPhotos {
    format: string;
    width:number;
    height:number;
    filename:string;
    id: string;
    author: string;
    author_url: string;
    post_url:string;
}

export const ApiService = {
    getPhotos: async(): Promise<ModelPhotos[]> => {
        let url = "https://picsum.photos/list";
        return await getJOSN(url);
    }
};


async function getJOSN(url: string): Promise<any> {
    console.log("getPhotos getJOSN");
    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        console.log("getPhotos !response.ok");
        return null;
    } else {
        console.log("getPhotos response.ok");
        const text = await response.text();
        return JSON.parse(text);
    }
}