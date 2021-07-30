import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Checkbox, Grid  } from 'semantic-ui-react';

const TableDisplay = ({ allusers, currentPage, handleDelete, handleEdit}) => {

    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(10);
    
    


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const [currentPosts, setcurrentPosts] = useState(allusers.slice(indexOfFirstPost, indexOfLastPost));
    const currentPosts = allusers.slice(indexOfFirstPost, indexOfLastPost);
    // const handleCheckboxChange = (e) => {
    //     // const{ name, checked } = e.target;
    //     // if(name === "allselect"){
    //     //     let tempUser = currentPosts.map(user => {
    //     //         return {...user, isChecked: checked}
    //     //     });
    //     //         setcurrentPosts(tempUser);   
    //     // }else{
    //     //     let tempUser = currentPosts.map((user) => 
    //     //     user.name === name ? { ...user, isChecked : checked } : user);
    //     //     setcurrentPosts(tempUser);
    //     // }

    // }
    return (       
        <Table responsive selectable basic='very'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <Checkbox 
                        name="allselect"/>
                    </Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            
            <Table.Body>  
                {currentPosts.map( (user) => (
                    <Table.Row>
                    <Table.Cell>
                        <Checkbox                        
                        name={user.name}                        
                        />
                    </Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                    <Table.Cell>
                        <button onClick={() => handleEdit(user.id)}>
                        <i class="edit outline icon"></i>
                        </button>
                    
                        <button onClick={() => handleDelete(user.id)}>
                        <i class="trash alternate outline icon red"  ></i> 
                        </button>
                    </Table.Cell>
                </Table.Row>
                ))}          
                    
                
            </Table.Body>
                                
        </Table>      
    );
}
 
export default TableDisplay;