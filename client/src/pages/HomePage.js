import React from 'react'
import imdb from '../img/imdb.png'
import imdb2 from '../img/imdb2.jpg'
import mtcrt from '../img/metacrt.jpg'

export const HomePage = () => {
    return (
        <div>
            <h1>Film Master</h1>
            <h4>Do not miss interesting movies, write down their names here!</h4>
            <hr/>
            <h5>Some links:</h5>
            <div className="row">
                <div className="col s4">
                    <h6>Most Popular Movies:</h6>
                    <a href="https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm" rel="noreferrer" target="_blank">
                        <img src={imdb2} style={{borderRadius:"10px"}} alt="IMDb"/>
                    </a>
                </div>

                <div className="col s4">
                    <h6>Top Rated Movies:</h6>
                    <a href="https://www.imdb.com/chart/top/?ref_=nv_mv_250" rel="noreferrer" target="_blank">
                        <img src={imdb} alt="IMDb"/>
                    </a>
                </div>

                <div className="col s4">
                    <h6>Coming Soon Movies:</h6>
                    <a href="https://www.metacritic.com/browse/movies/release-date/coming-soon/date" rel="noreferrer" target="_blank">
                        <img src={mtcrt} style={{borderRadius:"10px"}} alt="Metacritic"/>
                    </a>
                </div>
            </div>

        </div>
    )
}
