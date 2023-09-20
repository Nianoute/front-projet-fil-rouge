import { useEffect, useState } from "react"
import { createCategory, getAllCategories } from "../../../setup/services/category.service"
import { useNavigate } from "react-router-dom"

const CreateNewCategory = () => {
    const [category, setCategory] = useState({
        name: "",
        description: "",
        parent: null,
    })

    const [allCategories, setAllCategories] = useState([])
    const [error, setError] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const navigate = useNavigate()

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

    const [files, setFiles] = useState([])

    const onChangeFile = (e) => {
        setFiles([...e.target.files])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createCategory(category, files)
            .then(() => {
                setPopUp(true)
            }
            )
            .catch((err) => {
                console.log(err);
                setError(true)
            })
    }

    const handleCreateCategory = () => {
        setPopUp(false)
        setError(false)
        category.value = ""
        setAllCategories([...allCategories, category])
        setCategory({
            name: "",
            description: "",
            parent: null,
        })
    }

    return (
        <div className="createPost">
            <h1>Création d'une catégorie</h1>
            <form onSubmit={handleSubmit} className="formCreatePost">
                <div className="formStep">
                    <div className="separator" />
                    <h2>Informations générales</h2>
                    <div className="oneLabel">
                        <label htmlFor="name">
                            <p className="labelTitle">Nom de la catégorie:</p>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={category.name}
                                onChange={handleChange}
                                className="inputForm"
                                required
                            />
                        </label>
                    </div>
                    <div className="oneLabel">
                        <label>
                            <p className="labelTitle">Description:</p>
                            <textarea
                                type="text"
                                name="description"
                                id="description"
                                rows="10"
                                value={category.description}
                                onChange={handleChange}
                                className="commentDescription"
                            />
                        </label>
                    </div>
                </div>

                <div className="formStep">
                    <div className="separator" />
                    <h2>Image</h2>
                    <div className="oneLabel">
                        <label htmlFor="image">
                            <p className="labelTitle">Image:</p>
                            <input
                                type="file"
                                name="file"
                                placeholder="Image"
                                limit="5"
                                size="5"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={(e) => {
                                    onChangeFile(e);
                                }}
                            />
                        </label>
                    </div>
                </div>

                {allCategories.length > 0 && (
                    <div className="formStep">
                        <div className="separator" />
                        <h2>Catégorie parent</h2>
                        <div className="oneLabel">
                            <label>
                                <p className="labelTitle">Catégorie parente:</p>
                                <select
                                    name="parent"
                                    id="parent"
                                    onChange={handleChange}
                                    className="select"
                                >
                                    <option value={""}>--Aucune--</option>
                                    {allCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                )}

                <input type="submit" value="Submit" className="primaryBouton" />
                {error && <p className="error">Une erreur est survenue</p>}
            </form>

            {popUp && (
                <div className="popUp">
                    <div className="popUpContent">
                        <div className="textPopUp">
                            <img src="postValide.png" alt="PostValide création" />
                            <h2>La catégorie a bien été créé</h2>
                            <div className="popUpButton">
                                <div className="backHome" onClick={() => navigate("/")}>
                                    Retour à l'accueil
                                </div>
                                <div className="createPostV" onClick={handleCreateCategory}>
                                    Créer une autre catégorie
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateNewCategory