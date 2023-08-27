import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=9be1231460df58125cd413392df451fa';
    const _baseOffset = 210;
    
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res =  await request(`${_apiBase}characters/${id}?${_apiKey}`);                
        return _transformCharacter(res.data.results[0]);
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1],
            comics: char.comics.items    
        }
    }

    const getAllComics = async (offset = 100) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getComics = async (id) => {
        const res =  await request(`${_apiBase}comics/${id}?${_apiKey}`);                
        return _transformComics(res.data.results[0]);
    }
    const _transformComics = (item) => {
        return {
            id: item.id,
            title: item.title,
            price: item.prices.price ? `${item.prices.price}$` : 'NOT AVAILABLE'             
        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics};
}

export default useMarvelService;