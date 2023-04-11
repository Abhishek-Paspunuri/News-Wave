import React, { Component } from 'react'

class NewsItem extends Component {
  render() {
    let {title,desc,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className='container'>
        <div className="card" style={{width: "24rem"}}>
            {/* Badge */}
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left:'50%',zIndex:'1'}}>
                {source}
            </span>
            {/* Image */}
            <img src={imageUrl?imageUrl:"https://t4.ftcdn.net/jpg/05/24/79/53/360_F_524795399_deNrm5E4w2YDrx0JRP8mTe89ghUMvIoC.jpg"} className="card-img-top" style={{height:'180px'}}/>
            {/* Body */}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <p className="card-text"><small>By {!author?'Unknown':author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-dark">Read more news</a>
            </div>
        </div>
      </div>
    )
  }
}
export default NewsItem;