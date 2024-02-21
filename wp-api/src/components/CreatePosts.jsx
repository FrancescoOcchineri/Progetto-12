import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { token } from '../dati/dati';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function CreatePosts() {
  const [allPosts, setAllPosts] = useState([]); 
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPosts();
    getUsers();
    getCategories();
  }, []);

  async function getPosts() {
    try {
      const response = await axios.get(token + 'posts');
      console.log(response.data);
      setAllPosts(response.data); 
      setFilteredPosts(response.data); 

      await Promise.all(response.data.map(async (post) => {
        try {
          const commentResponse = await axios.get(`${token}comments?post=${post.id}`);
          const numberOfComments = commentResponse.data.length;
          setComments(prevState => ({
            ...prevState,
            [post.id]: numberOfComments
          }));
        } catch (error) {
          console.error('Errore nella chiamata API per ottenere i commenti', error);
        }
      }));
    } catch (error) {
      console.error('Errore nella chiamata API', error);
      console.log(error.response);
      setAllPosts([]);
      setFilteredPosts([]);
    }
  }
  
  async function getUsers() {
    try {
      const response = await axios.get(token + 'users');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Errore nella chiamata API', error);
      console.log(error.response);
      setUsers([]);
    }
  }
  
  async function getCategories() {
    try {
      const response = await axios.get(token + 'categories');
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Errore nella chiamata API', error);
      console.log(error.response);
      setCategories([]);
    }
  }

  async function deletePosts(postId) {
    try {
      const response = await axios.delete(`${token}posts/${postId}`);
      console.log(response.data);
      getPosts();
    } catch (error) {
      console.error('Errore nella chiamata API per eliminare il post', error);
      console.log(error.response);
    }
  }

  function getUserById(authorId) {
    return users.find(user => user.id === authorId);
  }

  function getCategoriesById(categoriesId) {
    return categories.find(category => category.id === categoriesId);
  }

  function handleLike(postId) {
    setLikedPosts(prevLikedPosts => {
      if (prevLikedPosts.includes(postId)) {
        return prevLikedPosts.filter(id => id !== postId);
      } else {
        setDislikedPosts(prevDislikedPosts => prevDislikedPosts.filter(id => id !== postId));
        return [...prevLikedPosts, postId];
      }
    });
  }

  function isLiked(postId) {
    return likedPosts.includes(postId);
  }

  function handleDislike(postId) {
    setDislikedPosts(prevDislikedPosts => {
      if (prevDislikedPosts.includes(postId)) {
        return prevDislikedPosts.filter(id => id !== postId);
      } else {
        setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== postId));
        return [...prevDislikedPosts, postId];
      }
    });
  }

  function isDisliked(postId) {
    return dislikedPosts.includes(postId);
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = allPosts.filter(post =>
      post.title.rendered.toLowerCase().includes(searchTerm)
    );
    setFilteredPosts(filtered);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <MDBContainer className="py-5">
      <MDBCard className="d-flex" style={{ width: "100%" }}>
        <MDBCardBody>
          <form className='d-flex input-group w-auto' style={{margin: '0 5rem'}}>
            <input 
              type='search' 
              className='form-control' 
              placeholder='Cerca' 
              aria-label='Search' 
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
          <MDBTable hover forum responsive className="text-center">
            <MDBTableHead>
              <tr>
                <th></th>
                <th className="text-left">Topic</th>
                <th>Comments</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {currentPosts && (
                currentPosts.map(post => {
                  const author = getUserById(post.author);
                  const category = getCategoriesById(post.categories[0]);
                  return (
                    <tr key={post.id}>
                      <td scope="row" className="text-nowrap">
                        <MDBBtn
                          outline
                          color="success"
                          size="sm"
                          className="p-1 m-0 waves-effect"
                          onClick={() => handleLike(post.id)}
                        >
                          <span className="value">{isLiked(post.id) ? 1 : 0}</span>
                          <MDBIcon fas icon="thumbs-up" className="ms-1" />
                        </MDBBtn>
                        <MDBBtn
                          outline
                          color="danger"
                          size="sm"
                          className="p-1 m-0 waves-effect mx-1"
                          onClick={() => handleDislike(post.id)}
                        >
                          <span className="value">{isDisliked(post.id) ? 1 : 0}</span>
                          <MDBIcon fas icon="thumbs-down" className="ms-1" />
                        </MDBBtn>
                      </td>
                      <td className="text-start">
                        <Link to={`/post/${post.id}`} className="font-weight-bold blue-text">{post.title.rendered}</Link>
                        <div className="my-2">
                          {author && (
                           <Link to='/users' className="blue-text">
                           <img src={(author && author.avatar_urls["24"]) || 'default-avatar-url'} alt="User Avatar"/> 
                           <strong> {(author && author.name) || 'Unknown'}</strong>
                         </Link>
                          )}
                          <span className="badge bg-secondary mx-1">{author.roles}</span>
                          {category && (
                            <span className="badge bg-warning mx-1">{category.name}</span>
                          )}
                          <span>{post.date.slice(0,10)}</span>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="text-dark">
                          <span>{comments[post.id]}</span>
                          <MDBIcon fas icon="comments" className="ms-1" />
                        </a>
                        <MDBBtn
                          outline
                          color="danger"
                          size="sm"
                          className="p-1 m-0 waves-effect mx-1"
                          onClick={() => deletePosts(post.id)}
                        >
                          <MDBIcon icon='trash-alt' />
                        </MDBBtn>
                        <MDBBtn
                          outline
                          color="warning"
                          size="sm"
                          className="p-1 m-0 waves-effect mx-1"
                        >
                          <MDBIcon fas icon='pen' />
                        </MDBBtn>
                      </td>
                    </tr>
                  );
                })
              )}
            </MDBTableBody>
          </MDBTable>
          <div className="d-flex justify-content-center">
            <nav className="my-3 pt-2">
              <MDBPagination circle className="mb-0">
                <MDBPaginationItem>
                  <MDBPaginationLink
                    previous
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{cursor: 'pointer'}}
                  />
                </MDBPaginationItem>
                {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, index) => (
                  <MDBPaginationItem key={index} active={index + 1 === currentPage}>
                    <MDBPaginationLink onClick={() => paginate(index + 1)} style={{cursor: 'pointer'}}>
                      {index + 1}
                    </MDBPaginationLink>
                  </MDBPaginationItem>
                ))}
                <MDBPaginationItem>
                  <MDBPaginationLink
                    next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                  />
                </MDBPaginationItem>
              </MDBPagination>
            </nav>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}