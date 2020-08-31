import React from 'react';

const Article = props => {
    return (
        <div className="col" key={props.key}>
            <div className="img-block">
                <img src={props.item.links.mission_patch_small} alt={props.item.mission_name} />
            </div>
            <div className="details">
                <p className="title"> { props.item.mission_name } #{props.item.flight_number } </p>
                <p><strong>Mission Ids</strong> : { props.item.mission_id.join(',') }</p>
                <p><strong>Launch Year</strong> : { props.item.launch_year }</p>
                <p><strong>Successful Launch</strong> : { (props.item.launch_success) ? "true": "false" }</p>
                <p><strong>Successful Landing</strong> : { props.item.rocket.first_stage.cores.map((d,x)=>(
                        <span key={x}>{  (d.land_success!==null) ? (d.land_success) ? "true" : "false" : "null" }</span>
                ))}</p>
            </div>
        </div>
    );
};
export default Article;