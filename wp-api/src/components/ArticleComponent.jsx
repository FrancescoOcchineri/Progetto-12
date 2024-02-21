import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { token } from '../dati/dati';
import {
  MDBRipple,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import axios from 'axios';
import he from 'he';

export default function ArticleComponent() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [media, setMedia] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        getPost();
        getMedia();
        getComment();
    }, [])

    async function getPost() {
        try {
            const response = await axios.get(`${token}posts/${id}`); 
            console.log(response.data);
            setPost(response.data);  
        } catch (error) {
            console.error('Errore nella chiamata API', error);
            console.log(error.response);
            setPost(null); 
        }
    }
    
    async function getComment() {
        try {
            const response = await axios.get(`${token}comments?post=${id}`);
            console.log(response.data);
            setComment(response.data);
        } catch (error) {
            console.error('Errore nella chiamata API', error);
            console.log(error.response);
            setComment([]); 
        }
    }

    async function getMedia() {
        try {
            const response = await axios.get(`${token}media?parent=${id}`);
            console.log(response.data);
            setMedia(response.data);
        } catch (error) {
            console.error('Errore nella chiamata API per ottenere i media del post', error);
        }
    }

    function htmlToText(htmlString) {
        return htmlString.replace(/<[^>]+>/g, '');
      }

  return (
    <MDBContainer className="py-5">
        {post && media[0] && (
      <MDBRow className="gx-5">
        <MDBCol md="6" className="mb-4">
          <MDBRipple
            className="bg-image hover-overlay ripple shadow-2-strong rounded-5"
            rippleTag="div"
            rippleColor="light"
          >
            <img
              src={media[0].guid.rendered}
              style={{width: '40rem'}}
            />
            <a href="#!">
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </MDBRipple>
        </MDBCol>
        <MDBCol md="6" className="mb-4">
            <h1>{post.title.rendered}</h1>
          <p className="text-muted mt-4">
          {htmlToText(he.decode(post.content.rendered))}
          </p>
        </MDBCol>
      </MDBRow>
        )}
      <section style={{ width: "100%" }}>
  <MDBRow className="justify-content-center">
    <MDBCol md="12" lg="10">
      <MDBCard className="text-dark">
        <MDBCardBody className="p-4">
          <MDBTypography tag="h4" className="mb-0">
            Commenti
          </MDBTypography>
          {comment && comment.length > 0 ? (
            comment.map((c, index) => (
          <div key={index} className="d-flex flex-start mt-5">
            <MDBCardImage
              className="rounded-circle shadow-1-strong me-3"
              src={c.author_avatar_urls[24]}
              alt="avatar"
              width="60"
              height="60"
            />
            <div>
              <MDBTypography tag="h6" className="fw-bold mb-1">
                {c.author_name}
              </MDBTypography>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0">
                  {c.date.slice(0,10)}
                </p>
              </div>
              <p className="mb-0">
              {htmlToText(he.decode(c.content.rendered))}
              </p>
            </div>
          </div>
          ))
          ): (
            <p className='mt-5'>Non sono presenti commenti</p>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</section>
    </MDBContainer>
  );
}
