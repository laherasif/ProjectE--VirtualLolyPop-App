import React from 'react'
import './style/list.css'
// import {graphql} from 'gatsby'
// import { useQuery } from "@apollo/client"



function template() {
   
    return (
        <div>
            <div>
            <h1>Virtual Lollypop</h1>
            <div className="container-list">

                <div className="main-container">

                    {/* {Result.map((loly, index) => {
                        return (

                            <div className="Loly-container">
                                <div className="loly" key={index}>
                                    <Loly top={loly.c1} middle={loly.c2} bottom={loly.c3} />

                                </div>

                                <div className="form-container">
                                    <div className="link">
                               
                                       <a href={`http://localhost:8888/lolyList/${loly.link}`}>{`http://localhost:8888/${loly.link}`}</a>
                                    </div>
                                    <div className="Data">

                                        <h3>{loly.rec}</h3>
                                        <h4>{loly.msg}</h4>
                                        <p>{loly.sender}</p>
                                    </div>

                                </div>
                            </div>
                        )
                    })} */}

                </div>

            </div>
        </div>
            
        </div>
    )
}

export default template
