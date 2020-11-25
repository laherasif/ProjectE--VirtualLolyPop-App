import React, { useState, useRef , useEffect} from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import Loly from '../component/loly'
import '../component/style/add.css'
import shortid from 'shortid'
import { navigate } from 'gatsby';


const GTE_QUERY = gql`
{
LolyData
    {
        link
    }
} 
    `


const ADD_LOLY = gql`
    mutation addLoly($c1: String! , $c2: String! , $c3: String! , $rec: String! , $msg: String!, $sender: String! , $link : String! ){
        addLoly(c1: $c1 , c2: $c2 , c3: $c3 , rec: $rec , msg: $msg ,sender: $sender , link : $link){
            id
        }
    }
`

const addLoly = () => {
    const [Id, setId] = useState("")

    const [c1, setC1] = useState("#deaa43");
    const [c2, setC2] = useState("#e95946");
    const [c3, setC3] = useState("#d52358");

    const recField = useRef()
    const msgField = useRef()
    const senderField = useRef()

    const [addLoly ,{ data }] = useMutation(ADD_LOLY);
    const id = shortid()
    const handleSubmit = async () => {
        const result = await addLoly({
            variables: {
                c1, c2, c3,
                rec: recField.current.value,
                sender: senderField.current.value,
                msg: msgField.current.value,
                link: id
            },
            refetchQueries: [{ query: GTE_QUERY }]
        })
        
            navigate(`/lolyList?id=${id}`);

       
       
    }


    // const { loading, error, data } = useQuery(GTE_QUERY)

    useEffect(() => {
        async function runHook() {
            const response = await fetch("https://api.netlify.com/build_hooks/5fa73211f2e549030b792c77", {
                method: "POST",
            });

        }
        runHook();

    }, [data])


    return (
        <div className="head">
                <i><h1>Virtual Lollipop</h1></i>
            <div className="container" >
                <div className="main-container">

                    <div>
                        <div className="Loly">
                            <Loly top={c1} middle={c2} bottom={c3} />
                            <ul>
                                <li>

                                    <label htmlFor="flavourTop" className="pickerLabel">
                                        <input type="color" className="colourpicker"
                                            id="flavourTop" onChange={(e) => { setC1(e.target.value) }}
                                            name="flavourTop" value={c1} />
                                    </label>
                                    {/* <input type="color" style={{borderRadius:'20px'}} value={c1} onChange={(e) => { setC1(e.target.value) }} /> */}

                                </li>
                                <li>
                                    <label htmlFor="flavourTop" className="pickerLabel">
                                        <input type="color" className="colourpicker"
                                            id="flavourTop" onChange={(e) => { setC2(e.target.value) }}
                                            name="flavourTop" value={c2} />
                                    </label>

                                </li>
                                <li>
                                    <label htmlFor="flavourTop" className="pickerLabel">
                                        <input type="color" className="colourpicker"
                                            id="flavourTop" onChange={(e) => { setC3(e.target.value) }}
                                            name="flavourTop" value={c3} />
                                    </label>

                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="form-container">
                        <input type="text" placeholder="To" ref={recField} />
                        <textarea placeholder="Enter your message!" ref={msgField}></textarea>
                        <input type="text" placeholder="From" ref={senderField} />
                        <button className="btn" onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default addLoly
