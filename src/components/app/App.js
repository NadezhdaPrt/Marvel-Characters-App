import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Spinner from "../spinner/spinner";

const Page404 = lazy( () => import('../pages/404'));
const MainPage = lazy( () => import('../pages/mainPage'));
const ComicsPage = lazy( () => import('../pages/comicsPage'));
const SingleComicPage = lazy( () => import('../pages/singleComicPage'));

const App = () => {   
    
    return (        
            <BrowserRouter>
             <div className="app">
                <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path='/' element={<MainPage/>}/>
                                <Route path='/comics' element={<ComicsPage/>}/>
                                <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                                <Route path="*" element={<Page404/>} />
                            </Routes>
                        </Suspense>
                    </main>    
             </div>
            </BrowserRouter>        
    )
} 

export default App;