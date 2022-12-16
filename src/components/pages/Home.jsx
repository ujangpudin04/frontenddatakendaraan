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

// notifikasi
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  // const [modalShow, setModalShow] = useState(false);
  const Navigate = useNavigate();
  const [data, setData] = useState(null);
  const [vehiclesList, setVehiclesList] = useState(null);

  // const [message, setMessage] = useState();

  const [form, setForm] = useState({
    searchByNoReg: "",
    searchKey: "",
  });

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
  // console.log(dataTemp);
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

      if (form.searchByNoReg.length >= 1) {
        if (response.status === 200 && response.data.length >= 1) {
          console.log(response.data);
          toast.success("Data Di Temukan", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
          return setData(response.data);
        } else {
          console.log(response.data);
          toast.error("Data Di Temukan", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
        }
      } else if (form.searchKey.length >= 1) {
        if (response.status === 200 && response.data.length >= 1) {
          console.log(response.data);
          toast.success("Data Di Temukan", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
          return setData(response.data);
        } else {
          console.log(response.data);
          toast.error("Data Di Temukan", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
          });
        }
      } else {
        toast.error("Data Di Temukan", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
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
      setForm(null);
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

  // console.log(data);

  return (
    <div className="container-fluid">
      <ToastContainer />
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
                ) : data.length > 1 ? (
                  data?.map((item, id) => {
                    return (
                      <tr key={id}>
                        <td>{(id += 1)}</td>
                        <td>{item?.nomorregkendaraan}</td>
                        <td>{item?.namapemilik}</td>
                        <td>{item?.merkkendaraan}</td>
                        <td>{item?.tahunpembuatan}</td>
                        <td>{item?.kapasitassilinder} CC</td>
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
                ) : data.length === 1 ? (
                  <tr>
                    <td>{data[0]?.id}</td>
                    <td>{data[0]?.nomorregkendaraan}</td>
                    <td>{data[0]?.namapemilik}</td>
                    <td>{data[0]?.merkkendaraan}</td>
                    <td>{data[0]?.tahunpembuatan}</td>
                    <td>{data[0]?.kapasitassilinder} CC</td>
                    <td>{data[0]?.warna}</td>
                    <td>{data[0]?.bahanbakar}</td>

                    <td className="fw-bold ">
                      <span
                        className="btn btn-success badge rounded-pill"
                        style={{ marginRight: "1rem" }}
                      >
                        <Link
                          to={"/detail/" + data[0].id}
                          // key={id}
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
                        to={"/update/" + data[0].id}
                        // key={id}
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
                          handleDelete(data[0].id);
                        }}
                      >
                        <FcEmptyTrash style={{ fontSize: "20px" }} />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ) : (
                  <h1>Data Tidak Ditemukan</h1>
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
