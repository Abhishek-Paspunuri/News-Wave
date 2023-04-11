import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    constructor(props){
        super(props);
        this.state={
            articles : [],
            loading : false,
            page: 1,
            totalResults: 0,
        }
        document.title=`${(this.props.category)[0].toUpperCase()+(this.props.category).slice(1)} - NewsWave`
    }
    static defaultProps={
        country: 'in',
        pageSize: 5
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }

    async updateNews(){
        this.props.setProgress(0);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        });
        let data= await fetch(url);
        this.props.setProgress(30);
        let parsedData= await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

    fetchMoreData= async() =>{
        this.setState({
            page: this.state.page+1,
        })
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    }

    // handlePrev = async ()=>{
    //     this.setState({page: this.state.page-1});
    //     this.updateNews();
    // }
    // handleNext = async ()=>{
    //     this.setState({page: this.state.page+1});
    //     this.updateNews();
    // }

    render() {
    return (
        <div className="container my-4">
            <h1 className='text-center' style={{margin:'30px'}}>News-Wave - Top {(this.props.category)[0].toUpperCase()+(this.props.category).slice(1)} Headlines</h1>
            {this.state.loading && <Spinner/>}

            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner/>} 
                style={{overflow:'hidden'}}>

                <div className="row my-3">
                    {/* !this.state.loading &&  */}
                    {this.state.articles.map((element)=>{  
                        return <div className="col-md-4"  key={element.url}>
                                <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name}/>
                            </div>
                    })}
                </div>
                                    
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr; </button>
            </div> */}
        </div>
    )
  }
}
