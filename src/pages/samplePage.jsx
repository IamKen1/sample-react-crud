
import React from "react";
import {  Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
import "./App.module.css";


export default function samplePage() {
return (
<>
<Navbar sticky="top" bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">NavBar</Navbar.Brand>
      <Nav className="me-auto">
        <Link className="mx-1"  to="/">Home</Link>
        <Link className="mx-1" to="/SamplePage">Sample</Link>
      </Nav>
    </Container>
  </Navbar>

<h1 className="text-center mt-5">Sample Page</h1>
</>


)

}
