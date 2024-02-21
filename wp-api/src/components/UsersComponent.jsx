import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { token } from '../dati/dati';

export default function UsersComponent() {

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getPosts();
        getUsers();
    }, [])

    async function getPosts() {
        try {
          const response = await axios.get(token + 'posts');
          console.log(response.data);
          setPosts(response.data); 
    
          await Promise.all(response.data.map(async (posts) => {
            try {
              const commentResponse = await axios.get(`${token}comments?post=${posts.id}`);
              const numberOfComments = commentResponse.data.length;
              setComments(prevState => ({
                ...prevState,
                [posts.id]: numberOfComments
              }));
            } catch (error) {
              console.error('Errore nella chiamata API per ottenere i commenti', error);
            }
          }));
        } catch (error) {
          console.error('Errore nella chiamata API', error);
          console.log(error.response);
          setPosts([]);
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

      function getUserById(authorId) {
        return users.find(user => user.id === authorId);
      }

      return (
        <div className="vh-100" style={{marginBottom: '12rem'}}>
          <h1 className='mt-4 text-center'><strong>Unisciti alla nostra Community</strong></h1>
          <MDBContainer>
            {users && users.length > 0 && (
              <div>
                {users.reduce((rows, user, index) => {
                  if (index % 2 === 0) {
                    rows.push([]);
                  }
                  rows[rows.length - 1].push(user);
                  return rows;
                }, []).map((row, rowIndex) => (
                  <MDBRow key={rowIndex} className="justify-content-center">
                    {row.map((u, cardIndex) => (
                      <MDBCol key={cardIndex} md="6" lg="6" xl="6" className="mt-5">
                        <MDBCard style={{ borderRadius: '15px' }}>
                          <MDBCardBody className="p-4">
                            <div className="d-flex text-black">
                              <div className="flex-shrink-0">
                                <MDBCardImage
                                  style={{ width: '50px', borderRadius: '10px' }}
                                  src={u.avatar_urls[24]}
                                  alt='Generic placeholder image'
                                  fluid />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <MDBCardTitle>{u.name}</MDBCardTitle>
                                <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                                  <div>
                                    <p className="small text-muted mb-1">Sito</p>
                                    <p className="mb-0">{u.url}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    ))}
                  </MDBRow>
                ))}
              </div>
            )}
          </MDBContainer>
        </div>
      );
                    }
