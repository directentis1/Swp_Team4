/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import axios from "axios";

const MovieList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate(`/movie/detailmovie/${id}`);
  };
  const LoadEdit = (id) => {
    navigate("/movie/editmovie/" + id);
  };

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8080/api/movie/deletemovie/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movie/listMovie")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="d-flex justify-content-center my-3">List Movie</h2>
        </div>
        <div className="card-body">
          <div className="divbtn text-end mx-4">
            <Link
              to="/movie/addmovie"
              className="btn btn-success rounded-0 mb-3">
              Add new movie
            </Link>
          </div>
          <table className="table table-bordered">
            <thead >
              <tr >
                <td className="bg-dark text-white">Id</td>
                <td className="bg-dark text-white">Poster</td>
                <td className="bg-dark text-white">Name</td>
                <td className="bg-dark text-white">Genre</td>
                <td className="bg-dark text-white">Country</td>
                <td className="bg-dark text-white">Show Date</td>
                <td className="action bg-dark text-white">Actions</td>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td style={{ width: "10px" }}>{item.id}</td>
                    <td style={{ width: "110px" }}>
                      {
                        <img
                          src={item.poster}
                          alt="Image"
                          style={{ width: "100%" }}
                        />
                      }
                    </td>
                    <td style={{ width: "110px" }}>{item.name}</td>
                    <td style={{ width: "100px" }}>{item.type}</td>
                    <td style={{ width: "90px" }}>{item.country}</td>
                    <td style={{ width: "90px" }}>{item.show_date}</td>
                    <td style={{ width: "110px" }} className="action">
                      <div>
                        <a
                          onClick={() => {
                            LoadDetail(item.id);
                          }}>
                          <BiDetail
                            className="btn btn-primary mx-1"
                            size={50}
                          />
                        </a>

                        <a
                          onClick={() => {
                            LoadEdit(item.id);
                          }}>
                          <BiEdit
                            className="btn btn-warning mx-1"
                            size={50}
                          />
                        </a>

                        <a
                          className=""
                          onClick={() => {
                            Removefunction(item.id);
                          }}>
                          <RiDeleteBinLine
                            className="btn btn-danger mx-1"
                            size={50}
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
