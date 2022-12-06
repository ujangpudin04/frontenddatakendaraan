import React, { useState } from "react";
import { FcFolder, FcInfo, FcEditImage, FcEmptyTrash } from "react-icons/fc";
import { Form, Button, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useMutation } from "react-query";
// import DeleteData from "../modal/Delete";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DeleteData from "../modal/DeleteData";

function Home() {
  // const [modalShow, setModalShow] = useState(false);
  const Navigate = useNavigate();
  const [data, setData] = useState(null);
  const [vehiclesList, setVehiclesList] = useState(null);

  // const [message, setMessage] = useState();

  const [form, setForm] = useState();

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: vehicles, refetch } = useQuery("vehiclesCache", async () => {
    const response = await API.get("/vehicles");
    setVehiclesList(response?.data);
    return response?.data;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setData(null);
  };

  const dataTemp = { ...data };
  const dataSearch = dataTemp[0];
  // console.log(dataSearch);
  // console.log(dataSearch[0]?.namapemilik);
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = form;
      const response = await API.post("/vehicles/search", body, config);

      if (response.status === 200) {
        setData({ ...response.data });
      }
      // console.log(response);
    } catch (error) {
      <h1>{error.response.data.data}</h1>;
      // <Alert variant="danger" className="py-1 mb-3">
      // {error.response.data.data}
      // </Alert>
      // setMessage(alert);
    }
  });

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
    setForm(null);
    Navigate("/");
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/vehicles/${id}`);
      refetch();
      await setForm(null);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    setData();
  }, [vehiclesList]);

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
          <Form className="col" onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="col-md-4 mb-3">
              <Form.Label className="fw-bold">
                No.Registrasi Kendaraan
              </Form.Label>
              <Form.Control
                className="col-md-4"
                id="searchNoReg"
                type="text"
                placeholder="Input Cari No.Registrasi Kendaraan"
                name="searchByNoReg"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 col-md-4">
              <Form.Label className="fw-bold">Nama Pemilik</Form.Label>
              <Form.Control
                className="col-md-4"
                id="searchNamaPemilik"
                type="text"
                placeholder="Input Cari Nama Pemilik"
                name="searchKey"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="col mb-3 ">
              <div className="col d-flex justify-content-end ">
                <Button
                  variant="primary"
                  className="mx-3 fw-bold"
                  style={{
                    padding: ".5rem",
                    width: "8rem",
                    textAlign: "center",
                  }}
                  type="submit"
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
          </Form>
        </div>

        <div className="row">
          <div className="col">
            <Table striped bordered hover>
              <thead className="bg-secondary text-white">
                <tr>
                  <th>No.</th>
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
                {data == null || "" ? (
                  vehiclesList?.map((item, id) => {
                    // console.log(item);
                    // const idx = data.id;
                    return (
                      <tr key={id}>
                        <td>{(id += 1)}</td>
                        <td>{item.nomorregkendaraan}</td>
                        <td>{item.namapemilik}</td>
                        <td>{item.merkkendaraan}</td>
                        <td>{item.tahunpembuatan}</td>
                        <td>{item.kapasitassilinder} CC</td>
                        <td>{item.warna}</td>
                        <td>{item.bahanbakar}</td>

                        <td className="fw-bold ">
                          <span
                            className="btn btn-success badge rounded-pill"
                            style={{ marginRight: "1rem" }}
                          >
                            <Link
                              to={"/detail/" + item.id}
                              key={id}
                              style={{
                                textDecoration: "none",
                                color: "white",
                              }}
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
                            <span
                              style={{ color: "blue", marginRight: "1rem" }}
                            >
                              <FcEditImage style={{ fontSize: "20px" }} />
                              Edit
                            </span>
                          </Link>

                          <Button
                            style={{
                              color: "red",
                              background: "none",
                              border: "none",
                              fontWeight: "bold",
                            }}
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                          >
                            <FcEmptyTrash style={{ fontSize: "20px" }} />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>{dataSearch?.id}</td>
                    <td>{dataSearch?.nomorregkendaraan}</td>
                    <td>{dataSearch.namapemilik}</td>
                    <td>{dataSearch?.merkkendaraan}</td>
                    <td>{dataSearch?.tahunpembuatan}</td>
                    <td>{dataSearch?.kapasitassilinder} CC</td>
                    <td>{dataSearch?.warna}</td>
                    <td>{dataSearch?.bahanbakar}</td>

                    <td className="fw-bold ">
                      <span
                        className="btn btn-success badge rounded-pill"
                        style={{ marginRight: "1rem" }}
                      >
                        <Link
                          to={"/detail/" + dataSearch.id}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          <FcInfo style={{ fontSize: "20px" }} />
                          Detail
                        </Link>
                      </span>
                      <Link
                        to={"/update/" + dataSearch.id}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <span style={{ color: "blue", marginRight: "1rem" }}>
                          <FcEditImage style={{ fontSize: "20px" }} />
                          Edit
                        </span>
                      </Link>

                      <Button
                        style={{
                          color: "red",
                          background: "none",
                          border: "none",
                          fontWeight: "bold",
                        }}
                        onClick={() => {
                          handleDelete(dataSearch?.id);
                        }}
                      >
                        <FcEmptyTrash style={{ fontSize: "20px" }} />
                        Delete
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <DeleteData
              setConfirmDelete={setConfirmDelete}
              show={show}
              handleClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
