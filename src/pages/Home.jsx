import React, { useEffect, useState } from "react";
import { Table, Form, Modal, Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FileUploader } from "react-drag-drop-files";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./App.module.css";


function Home() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ id: null, username: "" });
  const [showModal, setShowModal] = useState(false);

  const fetchAndSetData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fetchRecords");
      if (response.ok) {
        setData(await response.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createOrUpdateRecord = async () => {
    const url = formData.id
      ? `http://localhost:5000/api/updateRecord/${formData.id}`
      : "http://localhost:5000/api/createRecord";
    const method = formData.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchAndSetData();
        handleClose();
      } else {
        console.error(
          `Error ${formData.id ? "updating" : "creating"} record:`,
          response.status
        );
      }
    } catch (error) {
      console.error(
        `Error ${formData.id ? "updating" : "creating"} record:`,
        error
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deleteRecord/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchAndSetData();
      } else {
        console.error("Error deleting record:", response.status);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleShow = (item = {}) => {
    setFormData(item);
    setShowModal(true);
    console.log(item);
  };

  const handleClose = () => {
    setFormData({ id: null, username: "" });
    setShowModal(false);
  };
  const fileTypes = ["PPTX", "JPG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  return (
    <>
      <Navbar sticky="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >NavBar</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="mx-1"  to="/">Home</Link>
           
            <Link className="mx-1" to="/SamplePage">Sample</Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col className="mt-5 mb-1">
            <Button
              className="col-md-12"
              responsive="true"
              size="sm"
              variant="primary"
              onClick={() => handleShow()}
            >
              Add
            </Button>
          </Col>

          <Table striped bordered hover responsive="true" size="sm">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Username</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1} </td>
                  <td
                    style={{ cursor: "pointer", overflow: "hidden" }}
                    onClick={() => handleShow(item)}
                  >
                    {item.username}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => handleShow(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>

        <Row>
          <Modal centered show={showModal} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>{formData.id ? "Edit" : "Add"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={formData.username || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={createOrUpdateRecord}
              >
                {formData.id ? "Update" : "Create"}
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>

        <Row>
          <Col className="d-flex justify-content-end ">
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
