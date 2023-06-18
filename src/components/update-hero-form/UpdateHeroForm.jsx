import { Link, useNavigate } from 'react-router-dom';
import './UpdateHeroForm.css'

function UpdateHeroForm({ data }) {
    const navigate = useNavigate();


    function submit(e) {
        e.preventDefault();
        const img = e.target.img.value;
        const title = e.target.title.value;
        const subtitle = e.target.subtitle.value;
        const link = e.target.link.value;

        const productData = {
            url: img,
            t: title,
            p: subtitle,
            link: link
        }
        if (data.url) {
            fetch(`http://localhost:3000/update-hero/${data._id}`, {
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
            fetch(`http://localhost:3000/add-hero`, {
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

    const title = data.url ? "Update Hero" : "Add Hero";
    const isActive = data.url ? true : false;

    return (
        <>
            <div className='form-main'>
                <form onSubmit={submit} className='form-p'>
                    <h2>{title}</h2>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.url} id="img" name='img' placeholder="IMG"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.t} id="title" name='title' placeholder="Title"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.p} id="subtitle" name='subtitle' placeholder="Sub Title"></input>
                    </div>
                    <div class="form-group">
                        <input type="text" defaultValue={data?.link} id="link" name='link' placeholder="Link"></input>
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
                        navigate("/hero");
                    }}> Cancel </button>
                }
            </div>
        </>
    )
}

export default UpdateHeroForm
