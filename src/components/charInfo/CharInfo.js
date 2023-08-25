import { useEffect, useState } from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);   
  
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect( () => {        
        updateChar();
    }, [props.charId]);    
    

    const updateChar = () => {        
        const {charId} = props;
        if (!charId) {
            return;
        } 
        clearError();       
        getCharacter(charId)
            .then(onCharLoaded)            
    }
    const onCharLoaded = (char) => {
        setChar(char);        
    }
    
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null; 
    
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}                
            {content} 
        </div>
    )
};
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgStyle = thumbnail.includes('image_not_available') ? {objectFit: 'contain'} : null;
    const comicsList = comics.length === 0 ? 'There are no available comics' : comics.map((item, i) => {
        if (i > 9) return;
        return(
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
            )
    });
    console.log(comicsList);
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}             
            </ul>
        </>
    )
}

export default CharInfo;