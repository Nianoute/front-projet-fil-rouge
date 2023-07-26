import { useEffect, useState } from "react"
import { createCategory, getAllCategories } from "../../../setup/services/category.service"

const CreateNewCategory = () => {
    const [category, setCategory] = useState({
        name: "",
        description: "",
        parent: null,
    })

    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        getAllCategories()
            .then((allCategories) => {
                setAllCategories([...allCategories])
            }
            )
            .catch((err) => console.log(err))

    }, [])

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createCategory(category)
            .then(() => {
                setCategory({ name: "", description: "" })
            }
            )
            .catch((err) => console.log(err))
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 mt-5">
                    <h1 className="text-center">Create New Category</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={category.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Category Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                value={category.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        {allCategories?.length > 0 && (
                            <div className="form-group">
                                <label htmlFor="parent">Parent Category</label>
                                <select
                                    className="form-control"
                                    id="parent"
                                    name="parent"
                                    onChange={handleChange}
                                >
                                    <option>Select Parent Category</option>
                                    {allCategories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary">
                            Create Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewCategory