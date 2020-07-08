import React, { useState, useEffect } from 'react';
import axios from 'axios';
import idimage from '../images/IDCard_EN.png';

const API_BASE = "http://localhost:5000";

function dateConverter(d) {
    let convertedDate = new Date(d);
    return convertedDate.toLocaleDateString();
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function submitForm(contentType, data, setResponse) {
    axios({
        url: `${API_BASE}/upload`,
        method: 'POST',
        data: data, 
        headers: {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
        }
    }).then((response) => {
        setResponse(response.data);
    }).catch((error) => {
        setResponse("error");
    })
}

function Upload() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    //const [image, setImage] = useState();
    const [passportdata, setPassportdata] = useState([]);
    const [image, setImage] = useState({ preview: "", raw: "" });
    const [uploadclicked, setClicked] = useState(false);
    console.log(image["preview"] === "" ? null : '465');

    function uploadWithFormData() {

        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        formData.append("desc", desc);
        console.log(file);
        console.log(isEmpty(passportdata));

        submitForm("multipart/form-data", formData, (msg) => {
            console.log(msg);
            
            setPassportdata(msg);
        });
        setClicked(true);
        /*submitForm("multipart/form-data", formData, /*reader.onloadend = (data) => {
            console.log(data)
        //}*/
            /*(data) => {
                reader.onloadstart = () => {
                    console.log("Ho, Hey!")
                };
                reader.onloadend = () => {
                    //setDesc(data);
                };
                setDesc(data);
                console.log(data)}
        );*/ 


        //return
    }

    
    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
            setFile(e.target.files[0]);
        }
    };

    const reloadPage = e => {
        window.location.reload();
        console.log('Ye Ye')
    }

    



    /*return (
        <div className="row">
            <div className="col s6">
                <h2>Upload Passport/ ID</h2>
                <form action="/">
                
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" name={file} onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>

                    <input type="button" value="Upload as Form" onClick={uploadWithFormData} className="col s6 offset-s3 btn" />
                </form>
            </div>
            <div className="col s6">
                <h1>{desc["nationality"]}</h1>
                
            </div>
        </div>
    )*/

    return (
        <div className="row">
            <div className="row">
                <div className="col s5 left-align" style={{ marginRight: "60px" }} >
                    {  image.preview === "" ? 
                    <h1>Upload Passport/ ID</h1>: null }
                    <form action="/">
                        { image.preview === "" ?
                        <div>
                            <div className="file-field input-field">
                                <div className="btn #e53935 red darken-1">
                                    <span>File</span>
                                    <input type="file" name={file} onChange={handleChange}/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>
                        </div> :
                        <img className="responsive-img hoverable" src={image.preview} style={{width: "80%", border: "2px solid #ddd", padding: "5px", height: "38vh", marginTop: "20px", marginBottom: "15px"}}></img>

                        }
            
                        <input type="button" value="Upload" onClick={uploadWithFormData} className="col s6 offset-s3 btn #e53935 red darken-1" />
                    
                    </form>
                
                </div>
                <div className="col s6">
                
                {/* image.preview === "" ? null :
                <img className="responsive-img hoverable" src={image.preview} style={{width: "80%", border: "1px solid #ddd", padding: "5px", height: "38vh"}}></img>
                */}
                    { uploadclicked == false ?
                    <div>
                        <div className="row">
                            <h1>Analyze your <span className="blue-text">document</span></h1>
                            <i className="large material-icons">remove</i>
                            <i className="large material-icons">remove</i>
                        </div>
                        <div className = "row">
                            <div className="col s4 left-align" >
                                <img src={idimage} alt="ID Image"  />
                            </div>
                            <div className="col s7 left-align" style={{marginLeft: "20px"}}>
                                <h5>Start with the side that includes the MRZ or, failing that, a bar code</h5>
                                <p></p>
                            </div>
                            <div className="col s12">
                                <h3>ID card / Passport</h3>
                                <h6>Accepted formats
                                    <span style={{border: "solid", margin: "0 3px", borderWidth: "1px", padding: "0 4px 1px", borderRadius: "5px"}}>pdf</span>
                                    <span style={{border: "solid", margin: "0 3px", borderWidth: "1px", padding: "0 4px 1px", borderRadius: "5px"}}>jpeg</span>
                                    <span style={{border: "solid", margin: "0 3px", borderWidth: "1px", padding: "0 4px 1px", borderRadius: "5px"}}>png</span>    
                                </h6>
                            </div>
                        </div>
                    </div>
                    : 
                    <div className="row">
                        { isEmpty(passportdata) == true ? 
                        <div>
                            <div style={{ marginTop: "20vh" }} className="preloader-wrapper big active">
                                <div className="spinner-layer spinner-blue">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div><div className="gap-patch">
                                        <div className="circle"></div>
                                    </div><div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        
                        <div>

                            <div className="row">
                                <div className="">
                                    <button style={{ marginTop: "20vh" }} className="waves-effect waves-light red btn-large" onClick={reloadPage}><i className="material-icons left" >cloud</i>new test</button>
                                </div>
                                <div className="">
                                    <button style={{ marginTop: "5vh" }} className=" waves-effect waves-light red btn-large"><i className="material-icons right">file_download</i>Download Report</button>
                                </div>
                            </div>
                        </div>
                        }
                        
                    </div> 
                    }
                </div>
            </div>
            <div className="row">
                <div className="">
                    { isEmpty(passportdata) == true ?
                        <div>
                        
                        </div> :
                        <div className="col s12 #ffebee red lighten-5">
                            <h3 className="center-align">Extracted Information</h3>
                            <div className="col s5 center-align">
                                
                                <h5>Names</h5>
                                    <p>{passportdata["names"]} {passportdata["surname"]}</p>
                                <h5>Nationality</h5>
                                    <p>{passportdata["nationality"]}</p>
                                <h5>Sex</h5>
                                    <p>{passportdata["sex"]}</p>
                            </div>
                            <div className="col s5 center-align">
                                
                                <h5>Date of Birth</h5>
                                    <p>{dateConverter(passportdata["date_of_birth"])}</p>
                                <h5>Expiration Date</h5>
                                    <p>{dateConverter(passportdata["expiration_date"])}</p>
                                <h5>Country</h5>
                                    <p>{passportdata["country"]}</p>
                                <h5>Passport Number</h5>
                                    <p>{passportdata["number"]}</p>
                            </div>
                        </div>
                    }
                </div>
        </div>
    </div>
    )
}

export default Upload;

