import { Link, useNavigate } from 'react-router-dom';
import './UpdateForm.css'

function UpdateForm({ data }) {
    const navigate = useNavigate();


    function submit(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const discreption = e.target.discreption.value;
        const category = e.target.category.value;
        const type = e.target.type.value;
        const url = e.target.url.value;
        const ratting = e.target.ratting.value;

        const productData = {
            name: name,
            img: url,
            dis: discreption,
            p: price,
            r: ratting,
            c: category,
            t: type
        }
        if (data.name) {
            fetch(`http://localhost:3000/update-singel-product/${data._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            }).then((res) => res.json()).then((data) => {
                if (data.acknowledged) {
                    window.location.reload(false);
                }
            })
            Object.keys(data).forEach(key => {
                delete data[key];
            })
        } else {
            fetch(`http://localhost:3000/add-singel-product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            }).then((res) => res.json()).then((data) => {
                if (data.acknowledged) {
                    window.location.reload(false);
                }
            })
        }
        clearFields(e);
    }
    function clearFields(event) {
        Array.from(event.target).forEach((e) => (e.value = ""));
    }

    const title = data.name ? "Update Product" : "Add Product";
    const isActive = data.name ? true : false;

    return (
        <>
            <div className='form-main'>
                <form onSubmit={submit} className='form-p'>
                    <h2>{title}</h2>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.name} id="name" name='name' placeholder="Name"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.p} id="price" name='price' placeholder="Price"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.dis} id="discreption" name='discreption' placeholder="Discreption"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.c} id="category" name='category' placeholder="Category"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.t} id="type" name='type' placeholder="Type"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.img} id="url" name='url' placeholder="IMG Url"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.r} id="ratting" name='ratting' placeholder="Ratting"></input>
                    </div>
                    <div class="form-group submit-btn">
                        <input type="submit" value="Submit"></input>
                    </div>

                </form>
                {isActive &&
                    <button className='button-f' onClick={() => {
                        Object.keys(data).forEach(key => {
                            delete data[key];
                        })
                        navigate("/product");
                    }}> Cancel </button>
                }
            </div>
        </>
    )
}

export default UpdateForm
