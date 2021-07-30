
import 'semantic-ui-css/semantic.min.css';
import {  Grid, Pagination, Input} from 'semantic-ui-react';
import { useEffect, useState } from "react";
import TableDisplay from './TableDisplay';

const MainPage = () => {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [searchData, setSearchData] = useState("");
    const [filtered, setFiltered] = useState([]);
        
    useEffect(() => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then((response) => response.json())
        .then((json) => {setData(json);
        setFiltered(json)});
        
    }, [])

    useEffect(()=>{
        const filterData = data.filter(user => {
            if(searchData === ""){
                setFiltered(data);
                return user;
            }
            if(user.name.toLowerCase().includes(searchData.toLowerCase()) ||
            user.email.toLowerCase().includes(searchData.toLowerCase()) ||
            user.role.toLowerCase().includes(searchData.toLowerCase())){
                return user;
            }
           
        })
        setFiltered(filterData);

        return () => {
            console.log('CLEANUP!');
        };
    }, [searchData]);

    function HandleSearch(e){
        setSearchData(e.target.value);
    }

    function handlePageClick(e, {activePage}) {
        setCurrentPage(activePage);
    }
    
    const handleDelete = (id) => {
        console.log(id);
        const filterOnDelete = filtered.filter( deleteUser => deleteUser.id !== id);
        setFiltered(filterOnDelete);
    }

    const handleEdit = (id) => {
        console.log(id);
        // const updateUser = filtered.map(
        //     user => {
        //         if(user.id === id){
        //             console.log(user);
                    
        //             return user;
        //         }
        //         return user;
        //     }
        // )
        // console.log(updateUser);
        // setFiltered(updateUser);
    }
    
    const pageCount = Math.ceil(filtered.length / postsPerPage);


    return (
        <div className="main-page">
                        
            <Grid>
                <Grid.Row></Grid.Row>
                <Grid.Row>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={8}>
                    <Input focus placeholder='Search by name, email or role...' onChange={HandleSearch} />
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
                 
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={12}>
                    <TableDisplay allusers={filtered} currentPage={currentPage} handleDelete={handleDelete} handleEdit={handleEdit} />                      
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column width={2}>
                    
                </Grid.Column>
                <Grid.Column width={12}>
                <button class="ui pink button">Delete</button>
                <Pagination className="pagination" totalPages={pageCount} activePage={currentPage}
                    onPageChange={handlePageClick} />
                </Grid.Column>
                <Grid.Column width={2}>
                    
                </Grid.Column>
                
                </Grid.Row>
            </Grid>
            
            

        </div>
    );
}
 
export default MainPage;