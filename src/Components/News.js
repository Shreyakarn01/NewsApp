import React, {useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {
  
  const capitalizeFirstLetter=(string)=>{
       return string.charAt(0).toUpperCase()+string.slice(1);
  }
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  
  
  const updateNews=async()=>{
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
   
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    console.log(parsedData)
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100)
}

useEffect(() => {
  updateNews();
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`

},[])
  

  const fetchMoreData=async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  }

  // handlePrevClick =async () => {
      //  setPage(page-1);
  //   updateNews();
  // }


  // handleNextClick =async () => {
  //  setPage(page+1);
  //  updateNews();
  //   }

  
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px',marginTop:'101px'}}>NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row my-3">
          {articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title? element.title.slice(0, 45):""} description={element.description ? element.description.slice(0, 60) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://deseret.brightspotcdn.com/dims4/default/59e1dd7/2147483647/strip/true/crop/3000x1713+0+144/resize/1461x834!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2F3D5HpWbuzxUHOptYzumQ_Ul3XOQ%3D%2F0x0%3A3000x2000%2F3000x2000%2Ffilters%3Afocal%281500x1000%3A1501x1001%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24779578%2FAP23189645516162.jpg"} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>
        </div>

        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={page <= 1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button type="button" disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
        </>
    )
  
}
News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general'
}
News.propTypes={
   country:PropTypes.string,
   pageSize:PropTypes.number,
   category:PropTypes.string
}

export default News


