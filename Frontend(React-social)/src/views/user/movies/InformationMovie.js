/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlineFieldTime } from "react-icons/ai";

import axios from "axios";
import ReactPlayer from "react-player";
import { Form, Modal } from "react-bootstrap";

const Informationmovie = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(data);
  const handleOpenVideoModal = () => {
    setShowVideoModal(true);
  };
  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <Container style={{ paddingTop: "5px" }}>
      <Row>
        <div className="movie_trailer detail_typeA">
          <div className="movie-box d-block">
            <Carousel>
              <Carousel.Item>
                <div className="d-flex justify-content-center ">
                  <img className="bannerImg" src={data?.movie?.banner} />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <div className="wide-top d-flex">
          <div className="thumb">
            <Row style={{ paddingTop: "5px" }} xs={12}>
              <Col>
                <img src={data?.movie?.poster} />
              </Col>
              <Col style={{ paddingRight: "100px" }}>
                <Form>
                  <h2 className="movie_title">{data?.movie?.name}</h2>
                  <p>
                    <AiOutlineFieldTime size={26} /> {data?.movie?.times}
                  </p>
                  <p>
                    <strong>Thể loại</strong> {data?.movie?.type}
                  </p>
                  <p>
                    <strong>Quốc gia</strong> {data?.movie?.country}
                  </p>
                  <p>
                    <strong>Ngày công chiếu </strong>
                    {data?.movie?.show_date}
                  </p>
                </Form>
              </Col>
            </Row>
            <Row xs={12}>
              <Button
                onClick={handleOpenVideoModal}
                className="btn_reverse Lang-LBL0000 d-block justify-content-center my-2 rounded-0"
                style={{
                  width: "175px",
                  border: "2px solid rgb(206, 161, 11)",
                }}
                variant="dark"
              >
                View Trailer
              </Button>

              <Modal
                show={showVideoModal}
                onHide={handleCloseVideoModal}
                size="lg"
              >
                <Modal.Body>
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=XoMEzmrEGGA"
                    width="100%" // Kích thước theo chiều ngang - căn chỉnh 100% theo chiều ngang của modal
                    style={{ aspectRatio: "16/9" }} // Tỷ lệ khung hình 16:9
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseVideoModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Row>
          </div>
        </div>
      </Row>
      <div className="summary my-4">
        <h3>Summary</h3>
        <p className="my-2">{data?.movie?.description}</p>
      </div>
      <div className="text-end my-2">
        <Link to="/" className="btn btn-danger">
          Back to list movie
        </Link>
      </div>
    </Container>
  );
};
export default Informationmovie;