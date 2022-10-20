import React, { useState } from "react";
import { FcFolder, FcInfo, FcEditImage, FcEmptyTrash } from "react-icons/fc";
import { Form, Button, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import ModalDelete from "../modal/Delete";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  // const [data, setData] = useState("");

  let { data: vehicles } = useQuery("vehiclesData", async () => {
    const response = await API.get("/vehicles");
    return response.data;
  });

  console.log(vehicles);

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col d-flex align-items-center">
          <FcFolder style={{ fontSize: "60px" }} />
          <h4 className="ps-3">Aplikasi Data Kendaraan</h4>
        </div>
      </div>
      <div className="row">
        <div
          className="col m-3 p-3"
          style={{ background: "#FCE4D6", borderRadius: "5px" }}
        >
          <Form className="col-md-4">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                No.Registrasi Kendaraan
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Cari No.Registrasi Kendaraan"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Nama Pemilik</Form.Label>
              <Form.Control type="text" placeholder="Input Cari Nama Pemilik" />
            </Form.Group>
          </Form>
        </div>

        <div className="row mb-3 ">
          <div className="col d-flex justify-content-end ">
            <Button
              variant="primary"
              className="mx-3 fw-bold"
              style={{ padding: ".5rem", width: "8rem", textAlign: "center" }}
            >
              Search
            </Button>
            <Link
              to={"/create"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                variant="primary"
                className="mx-1 fw-bold"
                style={{
                  padding: ".5rem",
                  width: "8rem",
                  textAlign: "center",
                }}
              >
                Add
              </Button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Table striped bordered hover>
              <thead className="bg-secondary">
                <tr>
                  <th>id</th>
                  <th>No. Registrasi</th>
                  <th>Nama Pemilik</th>
                  <th>Merk Kendaraan</th>
                  <th>Tahun Pembuatan</th>
                  <th>Kapasitas</th>
                  <th>Warna</th>
                  <th>Bahan Bakar</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles?.map((item, id) => {
                  console.log(item);
                  // const idx = item?.id;
                  return (
                    <tr key={id}>
                      <td>{(id += 1)}</td>
                      <td>{item?.nomorregkendaraan}</td>
                      <td>{item?.namapemilik}</td>
                      <td>{item?.merkkendaraan}</td>
                      <td>{item?.tahunpembuatan}</td>
                      <td>{item?.kapasitassilinder}</td>
                      <td>{item?.warna}</td>
                      <td>{item?.bahanbakar}</td>

                      <td className="fw-bold ">
                        <span
                          className="btn btn-success badge rounded-pill"
                          style={{ marginRight: "1rem" }}
                        >
                          <Link
                            to={"/detail/" + item.id}
                            key={id}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            <FcInfo style={{ fontSize: "20px" }} />
                            Detail
                          </Link>
                        </span>
                        <Link
                          to={"/update/" + item.id}
                          key={id}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <span style={{ color: "blue", marginRight: "1rem" }}>
                            <FcEditImage style={{ fontSize: "20px" }} />
                            Edit
                          </span>
                        </Link>
                        <span
                          style={{ color: "red" }}
                          onClick={() => setModalShow(true)}
                        >
                          <FcEmptyTrash style={{ fontSize: "20px" }} />
                          Delete
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <ModalDelete show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
