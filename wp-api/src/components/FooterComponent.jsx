import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function FooterComponent() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-light'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Connettiti ai nostri social networks:</span>
        </div>

        <div>
          <a href='https://www.facebook.com/' className='me-4 text-light'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='https://twitter.com/' className='me-4 text-light'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='https://www.instagram.com/' className='me-4 text-light'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='https://www.linkedin.com/' className='me-4 text-light'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Noi
              </h6>
              <p>
              Sei alla ricerca di una fonte informativa completa, affidabile e aggiornata sulle ultime notizie? Se sì, sei nel posto giusto! NeWP è il tuo portale di fiducia per accedere a una vasta gamma di notizie provenienti da tutto il mondo, dall'attualità politica agli sviluppi tecnologici, dall'intrattenimento agli aggiornamenti sportivi e molto altro ancora.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Blog</h6>
              <p>
                <Link to='/blog' className='text-reset'>
                  Accedi al nostro blog!
                </Link>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contatti</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@example.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright: Francesco Occhineri
      </div>
    </MDBFooter>
  );
}