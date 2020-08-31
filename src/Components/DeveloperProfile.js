import React, {useState } from 'react';

const DeveloperProfile = props =>{
    const [developer]    = useState({name:"Sanjeev Puspam",link:"https://www.linkedin.com/in/sanjeevpuspam"});
    return(
        <h3 style={{ textAlign:'center', backgroundColor:'#ffffff'}}> <a href={developer.link} target="_blank" title={developer.name}>{ '{'+developer.name+'}' }</a></h3>
    )
}
export default DeveloperProfile;