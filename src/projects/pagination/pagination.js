import React,{useState} from 'react'
import './pagination.css';
//import Pagination from 'react-bootstrap/Pagination';
import ReactPaginate from 'react-paginate';
import Project from './project';
import solarPlantsJsonData from './indiasolarproject';



function Paginate() {
    const [plants,setPlants]=useState(solarPlantsJsonData.slice(0,10)); 
    const [pageNumber,setPageNumber]=useState(0);
    //console.log(solarPlantsJsonData);

    const projectPerPage = 3;
    const pagesVisited = pageNumber * projectPerPage;
    
    
    // 3-6,6-9,...

    const displayProject = plants
    .slice(pagesVisited, pagesVisited + projectPerPage)
    .map(( plant )=>  <Project data={plant} />)
     console.log(displayProject);

   const pageCount = Math.ceil(plants.length / projectPerPage);

   const changePage = ({selected})=>{
        setPageNumber(selected);
   }

    return (
        <div className="paginationContainer">
            <div className="paginationProjects">
               {displayProject}
            </div>
            <ReactPaginate 
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                
            />
        </div>
    )
}

export default Paginate;
