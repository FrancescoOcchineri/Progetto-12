import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBCol,
  MDBIcon,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import {token} from '../dati/dati'
import axios from 'axios';
import he from 'he';
import { Link } from 'react-router-dom';

export default function HomePostsComponent() {

    const [posts, setPosts] = useState([]);
    const [media, setMedia] = useState([]);

    useEffect(() => {
        getPosts();
        getMedia();
    }, [])

    async function getPosts() {
        try {
            const response = await axios.get(token + 'posts?_embed');
            console.log(response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Errore nella chiamata API', error);
            console.log(error.response);
            setPosts({});
        }
    }

    async function getMedia() {
        try {
            const response = await axios.get(token + 'media');
            console.log(response.data);
            setMedia(response.data);
        } catch (error) {
            console.error('Errore nella chiamata API', error);
            console.log(error.response);
            setMedia({});
        }
    }

    function htmlToText(htmlString) {
        return htmlString.replace(/<[^>]+>/g, '');
      }

  return (
    <MDBContainer className="py-5">
    <MDBRow className="gx-5 border-bottom pb-4 mb-5">
      <MDBCol md="6" className="mb-4">
        <MDBRipple
          className="bg-image hover-overlay ripple shadow-2-strong rounded-5"
          rippleTag="div"
          rippleColor="light"
        >
          {posts.length > 0 && posts[0]._embedded['wp:featuredmedia'] && posts[0]._embedded['wp:featuredmedia'][0] &&
          <img
            src={posts[0]._embedded['wp:featuredmedia'][0].source_url}
            style={{width: '30rem'}}
          />
  }
          <a href="#!">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </a>
        </MDBRipple>
      </MDBCol>
      {posts.length > 0 && (
      <MDBCol md="6" className="mb-4">
        <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">
          News of the day
        </span>
            <h4>
                <strong>{posts[0].title.rendered}</strong>
            </h4>
        <p className="text-muted">
        {htmlToText(he.decode(posts[0].excerpt.rendered))}
        </p>
        <Link to={`/post/${posts[0].id}`}>
  <MDBBtn>Continua a leggere</MDBBtn>
</Link>
      </MDBCol>
       )}
    </MDBRow>
    <MDBRow className="gx-lg-5">
      <MDBCol lg="6" md="6" className="mb-4 mb-lg-0">
      <div>
      {posts && (
    posts.slice(0,4).map(post => (
          <a href="#!" className="text-dark">
            <MDBRow className="mb-4 border-bottom pb-2">
              <MDBCol size="3">
              {post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] &&
                        <img src={post._embedded['wp:featuredmedia'][0].source_url}
                        className="img-fluid shadow-1-strong rounded" 
                        alt="Featured" 
                        style={{width: '50rem', height: '6rem'}} />
                    }
              </MDBCol>

              <MDBCol size="9">
                <p className="mb-2">
                <Link to={`/post/${post.id}`}><strong className='text-black'>{post.title.rendered}</strong></Link>
                </p>
                <p>
                  <u>{post.date.slice(0,10)}</u>
                </p>
              </MDBCol>
            </MDBRow>
          </a>
        ))
      )}
        </div>
      </MDBCol>
      <MDBCol lg="6" md="6" className="mb-4 mb-lg-0">
        <div>
      {posts && (
    posts.slice(5,9).map(post => (
          <a href="#!" className="text-dark">
            <MDBRow className="mb-4 border-bottom pb-2">
              <MDBCol size="3">
              {post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] &&
                        <img src={post._embedded['wp:featuredmedia'][0].source_url}
                        className="img-fluid shadow-1-strong rounded" 
                        alt="Featured" 
                        style={{width: '50rem', height: '6rem'}} />
                    }
              </MDBCol>

              <MDBCol size="9">
                <p className="mb-2">
                <Link to={`/post/${post.id}`}><strong className='text-black'>{post.title.rendered}</strong></Link>
                </p>
                <p>
                  <u>{post.date.slice(0,10)}</u>
                </p>
              </MDBCol>
            </MDBRow>
          </a>
        ))
      )}
        </div>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  )
}
