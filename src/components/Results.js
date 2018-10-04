import React from 'react';



const Results = ({results}) => {
    const srcList = results.length ? (
        results.map(result => {

            return (
                        <div className="card ">
                            <img className="card-img-top" src={result.header.thumbnail} id="imgCard" alt="Broken Sorry." />
                            <div className="card-body d-flex flex-column mt-auto">
                                <h6 className="card-title">Similarity:{result.header.similarity}%</h6>
                                <a href={result.data.ext_urls} className="btn btn-sm btn-outline-primary mt-auto">View Source</a>
                            </div>
                        </div>
            )
            
        })
    ) : (
        <span></span>
    )
    return (
        <div className='results'>
         {srcList}
        </div>
    )
}

export default Results