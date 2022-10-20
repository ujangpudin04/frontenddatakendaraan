import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

function ModalDelete(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body closeButton>
        <Container>
          <Row className="mb-5">
            <Col>
              <h5>Anda Yakin Akan Menghapus Data Ini?</h5>
            </Col>
          </Row>

          <Row>
            <Col className="d-flex justify-content-end gap-3">
              <Button onClick={props.onHide} className="bg-primary">
                Oke
              </Button>
              <Button
                onClick={props.onHide}
                className="bg-secondary"
                style={{ border: "none" }}
              >
                Batal
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default ModalDelete;

// function App() {
//   const [modalShow, setModalShow] = useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch modal with grid
//       </Button>

//       <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
//     </>
//   );
// }

// render(<App />);
