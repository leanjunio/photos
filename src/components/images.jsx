import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image, Card } from 'react-bootstrap';

import unsplash from '../utils';

const Images = () => {
  const [image, setImage] = useState({});
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  async function fetchImage(query) {
    if (!!query) {
      await fetchImagesKeyword(query);
    } else {
      await fetchRandomImage();
    }
    setQuery('');
  }

  async function fetchImagesKeyword(query) {
    setImage({});
    try {
      const res = await unsplash.search.photos(query);
      const data = await res.json();
      console.log(data.results);
      setImages(data.results);
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchRandomImage() {
    setImage({});
    try {
      const res = await unsplash.photos.getRandomPhoto();
      const data = await res.json();
      setImage(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <h2>Search for images!</h2>
                <p>(leave the form blank if you want a random search!)</p>
              </Form.Label>
              <Form.Control type="text" ref={node => { setQuery(node) }} placeholder="e.g animals" />
            </Form.Group>
            <Button variant="primary" type="button" onClick={() => fetchImage(query.value)}>
              Search
            </Button>{' '}
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center py-5">
        {!!image.urls ?
          <Card>
            <Image src={image.urls.small} rounded />
          </Card>
        :
          images.map((image, i) => (
            <Card>
              <Image key={i} src={image.urls.small} rounded/>
            </Card>
          ))
        }
      </Row>
    </Container>
  );
}

export default Images;
