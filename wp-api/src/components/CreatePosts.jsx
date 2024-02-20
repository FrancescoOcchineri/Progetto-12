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
import {token} from '../dati/dati'
import axios from 'axios';

export default function CreatePosts() {

const [posts, setPosts] = useState([]);
const [users, setUsers] = useState([]);
const [categories, setCategories] = useState([]);
const [comments, setComments] = useState([]);
const [likedPosts, setLikedPosts] = useState([]);
const [DislikedPosts, setDislikedPosts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(7);

useEffect(() => {
    getPosts();
    getUsers();
    getCategories();
}, [])

async function getPosts() {
    try {
      const response = await axios.get(token + 'posts');
      console.log(response.data);
      setPosts(response.data);
      
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
      setPosts({});
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
      setUsers({});
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
      setCategories({});
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
        return DislikedPosts.includes(postId);
      }

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
      const paginate = pageNumber => setCurrentPage(pageNumber);

      return (
        <MDBContainer className="py-5">
          <MDBCard className="d-flex" style={{ width: "100%" }}>
            <MDBCardBody>
              <MDBTable hover forum responsive className="text-center">
                <MDBTableHead>
                  <tr>
                    <th></th>
                    <th className="text-left">Topic</th>
                    <th>Comments</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                        {currentPosts.map(post => {
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
                <a href="#" className="font-weight-bold blue-text">
                {post.title.rendered}
                </a>
                <div className="my-2">
                {author && (
                    <a href="#" className="blue-text">
                    <img src={author.avatar_urls["24"]} alt="User Avatar"/> 
                    <strong> {author.name}</strong>
                    </a>
                )}
                <span className="badge bg-secondary mx-1">{author.roles}</span>
                {category && (
                    <span className="badge bg-warning mx-1">{category.name}</span>
                )}
                <span>{post.date.slice(0,9)}</span>
                </div>
            </td>
            <td>
                <a href="#" className="text-dark">
                <span>{comments[post.id]}</span>
                <MDBIcon fas icon="comments" className="ms-1" />
                </a>
            </td>
            </tr>
        );
        })}
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
                {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, index) => (
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
                    disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                  />
                </MDBPaginationItem>
              </MDBPagination>
            </nav>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
      )
    }