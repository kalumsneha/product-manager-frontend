import Header from './Header'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function UpdateProd() {

    const [data, setData] = useState([]);
    const [revision, setRevision] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [wasteper, setWastePer] = useState("");
    const [laborper, setLabourPer] = useState("");
    const [equipment, setEquipment] = useState("");
    const [otherper, setOtherPer] = useState("");
    const [marginper, setMarginper] = useState("");
    let user = JSON.parse(localStorage.getItem('user-info'))
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        let result = await fetch("http://localhost:8000/api/product/" + params.id);
        result = await result.json();
        setData(result)
        setRevision(result.revision)
        setName(result.name)
        setDescription(result.description)
        setQuantity(result.quantity)
        setWastePer(result.waste_percentage)
        setLabourPer(result.labour_percentage)
        setEquipment(result.equipment_cost)
        setOtherPer(result.other_percentage)
        setMarginper(result.margin_percentage)
    }

    async function update_prod(id) {
        const formData = new FormData();
        formData.append('revision', (revision + 1))
        formData.append('name', name);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('waste_percentage', wasteper);
        formData.append('labour_percentage', laborper);
        formData.append('equipment_cost', equipment);
        formData.append('other_percentage', otherper);
        formData.append('margin_percentage', marginper);
        formData.append('modified_by', user.name);
        let result = await fetch("http://localhost:8000/api/updateproduct/" + id + "?_method=PUT", {
            method: 'POST',
            body: formData
        })
        alert("Product has been updated")
    }
    return (
        <div>
            <Header />
            <div>
                <h2 style={{ marginTop: 25 }}>Upgrade Product</h2>
                <div className="col-sm-6 offset-sm-3">
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Name</p>
                    <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} defaultValue={data.name} placeholder={"Name"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Description</p>
                    <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} defaultValue={data.description} placeholder={"Description"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Quantity</p>
                    <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} defaultValue={data.quantity} placeholder={"Quantity"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Waste Percentage</p>
                    <input type="text" className='form-control' onChange={(e) => setWastePer(e.target.value)} defaultValue={data.waste_percentage} placeholder={"Waste Percentage"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Labour Percentage</p>
                    <input type="text" className='form-control' onChange={(e) => setLabourPer(e.target.value)} defaultValue={data.labour_percentage} placeholder={"Labour Percentage"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Equipment Cost</p>
                    <input type="text" className='form-control' onChange={(e) => setEquipment(e.target.value)} defaultValue={data.equipment_cost} placeholder={"Equipment Cost"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Other Percentages</p>
                    <input type="text" className='form-control' onChange={(e) => setOtherPer(e.target.value)} defaultValue={data.other_percentage} placeholder={"Other Percentages"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Margin Percentage</p>
                    <input type="text" className='form-control' onChange={(e) => setMarginper(e.target.value)} defaultValue={data.margin_percentage} placeholder={"Margin Percentage"} />
                    <br />
                    <button style={{ marginBottom: 15 }} onClick={() => update_prod(data.id) && navigate('/')} className='btn btn-primary'>Upgrade Product</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProd