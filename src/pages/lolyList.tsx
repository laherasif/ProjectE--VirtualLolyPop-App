import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import '../component/style/list.css'
import Loly from '../component/loly'
import { Link } from 'gatsby'

const GET_LOLYS = gql`
{
     
    LolyData {
              id
              c1
              c2
              c3
              rec
              msg
              sender
              link
            }
            
    
        }
        `



function lolyList({ location }) {

    const id = location.search.slice(4, 14)
    const { loading, error, data } = useQuery(GET_LOLYS);

  const url = "https://jam-stack-lolypop.netlify.app/lolyList/?id="


    if (loading) {
        return <h2>Loading..</h2>
    }

    if (error) {
        console.log(JSON.stringify(error, null, 2));
        return <h2>Error</h2>
    }


    let Result = data ? data.LolyData.filter(item => {
        if (item.link === id) {
            return item

        }

    }
    )
        : null

    console.log("Result", )



    console.log("SAVE DATA IN STATE", data.LolyData)


    return (
        <div>
            <h1>Virtual Lollypop</h1>
            <div className="container-list">

                <div className="main-container">

                    {Result.map((loly, index) => {
                        return (

                            <div className="Loly-container">
                                <div className="loly" key={index}>
                                    <Loly top={loly.c1} middle={loly.c2} bottom={loly.c3} />

                                </div>

                                <div className="form-container">
                                    <div className="link">

                                        <i> <a href={`${url}${loly.link}`} target="_blank">{`${url}${loly.link}`}</a></i>
                                    </div>
                                    <div className="Data">

                                        <h4 >{loly.rec}</h4>
                                        <p>{loly.msg}</p>
                                        <h4 >__{loly.sender}</h4>
                                    </div>
                                    <h3>{loly.sender} made this virtual lollipop for you. You can <Link to="/addLoly">make your own </Link>to send to a friend who deserve some sugary treat which won't rot their teeth...

                                         </h3>

                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>
        </div>
    )
}

export default lolyList
