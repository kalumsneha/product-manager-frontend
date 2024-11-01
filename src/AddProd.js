import Header from './Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProd() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [wasteper, setWastePer] = useState("");
    const [laborper, setLabourPer] = useState("");
    const [equipment, setEquipment] = useState("");
    const [otherper, setOtherPer] = useState("");
    const [marginper, setMarginper] = useState("");
    const navigate = useNavigate();

    
    async function add_prod() {

        if (name && description && quantity && wasteper && laborper && equipment && otherper && marginper) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('quantity', quantity);
            formData.append('waste_percentage', wasteper);
            formData.append('labour_percentage', laborper);
            formData.append('equipment_cost', equipment);
            formData.append('other_percentage', otherper);
            formData.append('margin_percentage', marginper);
            let result = await fetch("http://18.221.156.168/api/addproduct", {
                method: 'POST',
                body: formData
            })
            if (name && description && quantity)
                alert("Product has been added."+"Please fill the Materials in View.")
            navigate("/")
        }
        else{
            alert("All fields are mandatory.")
        }

    }


    return (
        <div>
            <Header />
            <div>
                <h2 style={{marginTop:25}}>Add Product</h2>
                <div className="col-sm-6 offset-sm-3">
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Name</p>
                    <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} placeholder={"Name"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Description</p>
                    <input type="text" className='form-control' onChange={(e) => setDescription(e.target.value)} placeholder={"Description"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Quantity</p>
                    <input type="text" className='form-control' onChange={(e) => setQuantity(e.target.value)} placeholder={"Quantity"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Waste Percentage</p>
                    <input type="text" className='form-control' onChange={(e) => setWastePer(e.target.value)} placeholder={"Waste Percentage"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Labour Percentage</p>
                    <input type="text" className='form-control' onChange={(e) => setLabourPer(e.target.value)} placeholder={"Labour Percentage"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Equipment Cost</p>
                    <input type="text" className='form-control' onChange={(e) => setEquipment(e.target.value)} placeholder={"Equipment Cost"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Other Percentages</p>
                    <input type="text" className='form-control' onChange={(e) => setOtherPer(e.target.value)} placeholder={"Other Percentages"} />
                    <br />
                    <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Margin Percentage</p>
                    <input type="text" className='form-control' onChange={(e) => setMarginper(e.target.value)} placeholder={"Margin Percentage"} />
                    <br />
                    <button style={{marginBottom: 15}} onClick={add_prod} className='btn btn-primary'>Add Product</button>
                </div>

            </div>
        </div>
    )
}

export default AddProd