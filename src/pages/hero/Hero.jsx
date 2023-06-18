import UpdateHeroForm from '../../components/update-hero-form/UpdateHeroForm';
import './Hero.css'
import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from 'react';

function Hero() {
    const dataProduct = useLoaderData();
    const [data, setData] = useState({});
    const [val, setVal] = useState("");
    const [product, setProduct] = useState(dataProduct);


    useEffect(() => {
        const urls = `http://localhost:3000/single-hero/${val}`;
        fetch(urls).then(res => res.json()).then(data => {
            setData(data);
        });
    }, [val])

    function getProductForUpdate(value) {
        setVal(value);
    }

    function productDelete(id) {
        fetch(`http://localhost:3000/delete-hero-by-id/${id}`, {
            method: "DELETE"
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            if (data.deletedCount > 0) {
                const newProduct = product?.filter(singelProduct => singelProduct._id != id);
                setProduct(newProduct);
            }
        })
    }

    return (
        <>
            <div className='p-container'>
                <div className="p-left">
                    <table class="content-table">
                        <thead>
                            <tr>
                                <th>Img</th>
                                <th>Title</th>
                                <th>Sub Title</th>
                                <th>Go To</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.map((e) => (
                                <tr class="active-row" key={e._id}>
                                    <td><img src={e.url} className='t-img'></img></td>
                                    <td>{e.t}</td>
                                    <td>{e.p}</td>
                                    <td>{e.link}</td>
                                    <td><button onClick={() => getProductForUpdate(e._id)} class="update-btn">Update</button> <button class="delet-btn" onClick={() => productDelete(e._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-right">
                    <UpdateHeroForm data={data}></UpdateHeroForm>
                </div>
            </div>

        </>
    )
}

export default Hero
