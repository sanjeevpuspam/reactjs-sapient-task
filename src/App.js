import React, {useState, useEffect } from 'react';
import './App.css';
import Article from './Components/Article';
import DeveloperProfile from './Components/DeveloperProfile';

function App() {
  
  const [data,setData]     = useState([]);
  const [launchYear]       = useState([2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006]);
  const [isSuccess]        = useState(["True","False"]);
  
  const [launch,setLaunch]    = useState('');
  const [landing,setLanding]  = useState('');
  const [year,setYear]        = useState('');

  useEffect(()=> {
    fetchFilterData(`https://api.spacexdata.com/v3/launches?limit=100`);
  },[]);

  const fetchFilterData = async(url)=> {
    try{
        const result = await fetch(url)
          .then(response => response.json())
          .catch(error => {
            throw(error);
          });

      setData(result); 
    } catch(err){
        console.log(`Error in Exception => ${err.message}`);
    }
  }
  const setFilterData = (event) =>{
      let apiBaseUrl  = "https://api.spacexdata.com/v3/launches?limit=100";
      let val = (event.target.value).toLowerCase();

      if(event.target.name === 'launch_year'){
        setYear(val);
        if(launch ==='' && landing ===''){  
          return fetchFilterData(`${apiBaseUrl}&launch_year=${val}`);
        } else if(launch ===''){
          return fetchFilterData(`${apiBaseUrl}&launch_year=${val}&land_success=${landing}`);
        } else if(landing ===''){
          return fetchFilterData(`${apiBaseUrl}&launch_year=${val}&launch_success=${launch}`);
        } else {
          return fetchFilterData(`${apiBaseUrl}&launch_year=${val}&launch_success=${launch}&land_success=${landing}`);
        }
      } 

      if(event.target.name === 'successful_launch'){
        setLaunch(val);
        if(year ===0 && landing ===''){
          return fetchFilterData(`${apiBaseUrl}&launch_success=${val}`)
        } else if(year === 0){
          return fetchFilterData(`${apiBaseUrl}&launch_success=${val}&land_success=${landing}`);
        } else if(landing ===''){
          return fetchFilterData(`${apiBaseUrl}&launch_success=${val}&launch_year=${year}`);
        } else {
          return fetchFilterData(`${apiBaseUrl}&launch_success=${val}&launch_year=${year}&land_success=${landing}`);
        }
      }
      if(event.target.name === 'successful_landing'){
        setLanding(val);
        if(year ===0 && launch ===''){
          return fetchFilterData(`${apiBaseUrl}&land_success=${val}`);
        } else if(year === 0){
          return fetchFilterData(`${apiBaseUrl}&launch_success=${launch}&land_success=${val}`);
        } else if(launch === ''){  
          return fetchFilterData(`${apiBaseUrl}&launch_year=${year}&land_success=${val}`);
        } else {
          return fetchFilterData(`${apiBaseUrl}&launch_success=${launch}&launch_year=${year}&land_success=${val}`);
        }        
      }
  }

  return (
    <div className="App">
    <h2>SpaceX launch Programs</h2>
    <aside>
    <h3 className="title">Spacex Launch Year</h3>
        <div className="filter" onChange={setFilterData}>
          {
            launchYear.map((y,idx)=>{
              return (<div key={idx} className="radio-toolbar">
                  <input type="radio" id={ "launch_year_"+y} value={y} name="launch_year" /> 
                  <label htmlFor={ "launch_year_"+y}>{ y }</label>
              </div>)
            })
          }
        </div>
        <h3 className="title">Successful Launch</h3>
        <div className="filter" onChange={setFilterData}>
          {
              isSuccess.map((y,idx)=>{
                return (<div key={idx} className="radio-toolbar">
                    <input type="radio" id={ "successful_launch"+y} value={y} name="successful_launch" /> 
                    <label htmlFor={ "successful_launch"+y}>{ y }</label>
                </div>)
              })
            }
        </div>
        <h3 className="title">Successful Landing</h3>
        <div className="filter" onChange={setFilterData}>
            {
              isSuccess.map((y,idx)=>{
                  return (<div key={idx} className="radio-toolbar">
                      <input type="radio" id={ "successful_landing"+y} value={y} name="successful_landing" /> 
                      <label htmlFor={ "successful_landing"+y}>{ y }</label>
                  </div>)
                })
              }
        </div>
    </aside>
    <article>
        { data.length > 0 ? data.map((item,idx) => ( 
          <Article item={item} key={idx} /> 
          )) : <div className="col" key="0"><div className="img-block">
                  <img src="https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif" alt="Not found" />
              </div><div className="details"></div></div>
      }
    </article>
      <DeveloperProfile />
    </div>
  );
}

export default App;
