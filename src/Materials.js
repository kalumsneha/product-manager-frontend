import Header from './Header'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

function Materials() {

    const [data, setData] = useState([]);
    const [matData, setMatData] = useState([]);
    var date = new Date();
    let user = JSON.parse(localStorage.getItem('user-info'))
    const params = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        fetchData();
        fetchMatData();
    }, [])

    function addMat() {
        navigate('/addmat/' + data.id)

    }

    function pad2(n) {
        return n < 10 ? '0' + n : n
    }

    async function fetchData() {
        let result = await fetch("http://18.221.156.168/api/product/" + params.id);
        result = await result.json();
        setData(result)
    }

    async function fetchMatData() {
        let result = await fetch("http://18.221.156.168/api/listproductmat");
        result = await result.json();
        setMatData(result)
    }

    async function deleteOp(id) {
        const formData = new FormData();
        formData.append('deleted', 1);
        formData.append('deleted_at', date.getFullYear().toString() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate()) + ' ' + pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' + pad2(date.getSeconds()));
        formData.append('modified_by', user.name);
        let result = await fetch("http://18.221.156.168/api/deleteproductmat/" + id + "?_method=PUT", {
            method: 'POST',
            body: formData
        })
        alert("Product has been deleted")
        fetchData();
        fetchMatData();
    }

    function updateOp(id) {
        navigate('/updatemat/' + id)
    }

    function back() {
        navigate('/')
    }


    return (
        <div>
            <Header />
            <div>
                <h2 style={{marginTop:25}}>Product Materials</h2>
                <div className="col-sm-2 offset-sm-1">
                    <button onClick={addMat} className='btn btn-primary'>+ Add Materials</button>
                </div>
                <div className="col-sm-10 offset-sm-1">
                    <br />
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <td colSpan='5'>{data.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td colSpan='2'>{data.name}</td>
                                <th>Quantity</th>
                                <td colSpan='2'>{data.quantity}</td>
                            </tr>
                            <tr>
                                <th colSpan='2'>Description</th>
                                <td colSpan='4'>{data.description}</td>
                            </tr>

                            <tr>
                                <th colSpan='6'>Product Materials</th>
                            </tr>

                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Rate</th>
                                <th>Actions</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        {
                            matData.map((item) =>
                                <tbody key={item.id}>
                                    {
                                        item.product_id == params.id && item.deleted == 0 ?
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.description}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.rate}</td>
                                                <td><div><Button style={{marginBottom: 5}} onClick={() => updateOp(item.id)} variant="warning">Update</Button>{" "}
                                                    <Button style={{marginBottom: 5}} onClick={() => deleteOp(item.id)} variant="danger">Delete</Button></div></td>
                                                <td>{item.amount}</td>
                                            </tr>
                                            :
                                            <></>
                                    }
                                </tbody>
                            )
                        }
                        <thead>
                            <tr>
                                <th colSpan='2'>Total Material Items</th>
                                <td>{data.material_items}</td>
                                <th>Margin Amount</th>
                                <td colSpan='2'>{data.material_cost}</td>
                            </tr>
                            <tr>
                                <th colSpan='2'>Waste Percentage</th>
                                <td>{data.waste_percentage}</td>
                                <th>Waste Amount</th>
                                <td colSpan='2'>{data.waste_amount}</td>
                            </tr>
                            <tr>
                                <th colSpan='2'>Labour Percentage</th>
                                <td>{data.labour_percentage}</td>
                                <th>Labour Cost</th>
                                <td colSpan='2'>{data.labour_amount}</td>
                            </tr>
                            <tr>
                                <th colSpan='4'>Equipment Cost</th>
                                <td colSpan='2'>{data.equipment_cost}</td>
                            </tr>
                            <tr>
                                <th colSpan='2'>Other Percentages</th>
                                <td>{data.other_percentage}</td>
                                <th>Other Cost</th>
                                <td colSpan='2'>{data.other_amount}</td>
                            </tr>
                            <tr>
                                <th colSpan='2'>Margin Percentage</th>
                                <td>{data.margin_percentage}</td>
                                <th>Margin Amount</th>
                                <td colSpan='2'>{data.margin_amount}</td>
                            </tr>
                            <tr>
                                <th colSpan='4'>Sub Total</th>
                                <td colSpan='2'>{data.sub_total}</td>
                            </tr>
                            <tr>
                                <th colSpan='4'>Total</th>
                                <td colSpan='2'>{data.amount}</td>
                            </tr>
                        </thead>
                    </Table>
                    
                </div>
                <br />
                <Button style={{marginBottom: 25}} onClick={()=>back()} variant="primary">Back</Button>
            </div>
            

        </div>
    )
}

export default Materials