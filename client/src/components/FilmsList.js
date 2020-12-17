import React from 'react'
import {Link} from 'react-router-dom'

export const FilmsList = ({films}) => {

    if(!films.length){
        return <p className="center">There are no movies yet</p>
    }

    return(
        <table style={{width:"80%", backdropFilter: "blur(5px)"}}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Genre</th>
                <th>Year</th>
                <th style={{width:"15%"}}>isWatched</th>

            </tr>
            </thead>

            <tbody>
            { films.map( film => {
                return (
                    <tr key={film._id}>
                        <td>{film.name}</td>
                        <td>{film.genre}</td>
                        <td>{film.year}</td>
                        <td style={{width:"15%"}}>
                            <input type="checkbox" checked={film.isWatched} disabled="disabled"/>
                            <span/>
                        </td>
                        <td>
                            <Link to={`/film/${film._id}`}>Details</Link>
                        </td>
                    </tr>
                )
            })  }

            </tbody>
        </table>
    )

}

