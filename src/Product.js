import Header from "./Header";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

function Product() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  var date = new Date();
  let user = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    fetchData();
  }, []);


  function addProd() {
    navigate("/add");
  }

  function pad2(n) {
    return n < 10 ? "0" + n : n;
  }

  async function deleteOp(id) {
    const formData = new FormData();
    formData.append("deleted", 1);
    formData.append(
      "deleted_at",
      date.getFullYear().toString() +
        "-" +
        pad2(date.getMonth() + 1) +
        "-" +
        pad2(date.getDate()) +
        " " +
        pad2(date.getHours()) +
        ":" +
        pad2(date.getMinutes()) +
        ":" +
        pad2(date.getSeconds())
    );
    formData.append("modified_by", user.name);
    let result = await fetch(
      "http://localhost:8000/api/deleteproduct/" + id + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );
    alert("Product has been deleted");
    fetchData();
  }

  async function fetchData() {
    let result = await fetch("http://localhost:8000/api/listproduct");
    result = await result.json();
    setData(result);
  }

  function updateOp(id) {
    navigate("/update/" + id);
  }

  function material(id) {
    navigate("/material/" + id);
  }

  function getSum(data) {
    let total = 0;
    data.forEach((item) => {
      if (item.deleted == 0) {
        total += item.amount;
      }
    });
    return total;
  }

  return (
    <div>
      <Header />
      <div>
        <h2 style={{ marginTop: 25 }}>Bill of Quantity</h2>
        <div className="col-sm-5 offset-sm-7">
          <button onClick={addProd} className="btn btn-primary">
            + Add Product
          </button>
        </div>
        <br />
        <div className="col-sm-10 offset-sm-1">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Prouduct Cost</th>
                <th>Quantity</th>
                <th>Actions</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody key={item.id}>
                {item.deleted == 0 ? (
                  <>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.sub_total}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <div>
                          <Button
                            style={{ marginBottom: 5 }}
                            onClick={() => material(item.id)}
                            variant="primary"
                          >
                            View
                          </Button>{" "}
                          <Button
                            style={{ marginBottom: 5 }}
                            onClick={() => updateOp(item.id)}
                            variant="warning"
                          >
                            Update
                          </Button>{" "}
                          <Button
                            style={{ marginBottom: 5 }}
                            onClick={() => deleteOp(item.id)}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                      <td>{item.amount}</td>
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            ))}
            <thead>
              <th colSpan="5">Total</th>
              <th colSpan="2">{getSum(data)}</th>
            </thead>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Product;
