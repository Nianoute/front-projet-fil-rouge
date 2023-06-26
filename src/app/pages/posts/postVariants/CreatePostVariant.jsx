import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPostVariantOfPost } from "../../../../setup/services/postVariant.services";

const CreatePostVariant = () => {
    const location = useLocation();
    const post = location.state.post
    const navigation = useNavigate();
    const [postVariant] = useState([]);
    const [postVariantActive, setPostVariantActive] = useState({
        title: "",
        description: "",
        price: 0,
        promoPrice: 0,
    });


    const onChangePostVariantActive = (e) => {
        setPostVariantActive({ ...postVariantActive, [e.target.name]: e.target.value });
    };

    const handleAddPost = async (e) => {
        e.preventDefault();
        postVariantActive.post = post.id;

        postVariant.push(postVariantActive);
        setPostVariantActive({
            title: "",
            description: "",
            price: 0,
            promoPrice: 0,
            });
    }

    const handleCreatePostVariantes = async (e) => {
        e.preventDefault();
        await createPostVariantOfPost(postVariant);
        navigation('/');
    }

    return (
        <div className="createPost">   
        <h1>Creation des variantes de posts</h1>
        <form onSubmit={handleAddPost} className="formCreatePost">
            <div className="formStep">
              <div className="separator"/>
              <h2>Informations du post</h2>
              <div className="oneLabel">
                <label>
                    <input type="text" onChange={onChangePostVariantActive} value={postVariantActive.title} name="title" className="inputForm" placeholder="Le titre du post"/>
                </label>
              </div>
              <div className="oneLabel">
                <label>
                    <input type="text" onChange={onChangePostVariantActive} value={postVariantActive.description} name="description" className="inputForm" placeholder="La description"/>
                </label>
              </div>
            </div>

            <div className="formStep">
              <div className="separator"/>
              <h2>Les prix</h2>
              <div className="oneLabel">
                <label>
                    <input type="number" onChange={onChangePostVariantActive} value={postVariantActive.promoPrice} name="promoPrice" className="inputForm" placeholder="Le prix actuel"/>
                </label>
              </div>
              <div className="oneLabel">
                <label>
                    <input type="number" onChange={onChangePostVariantActive} value={postVariantActive.price} name="price" className="inputForm" placeholder="Le prix avant promotion"/>
                </label>
              </div>
            </div>
            
            <input type="submit" value="Ajouter" className="primaryBouton"/>
        </form>

        {postVariant.length !== 0 && (
            <div className="postVariant">
                {postVariant.map((postVariant, index) => (
                    <div key={index} className="onePost">
                        <h2>{postVariant.title}</h2>
                        <p>{postVariant.description}</p>
                        <p>{postVariant.promoPrice}</p>
                        <p>{postVariant.price}</p>
                    </div>
                ))}

                <input type="submit" value="Créer" className="primaryBouton" onClick={handleCreatePostVariantes}/>
            </div>
        )}
      </div>
    )
}

export default CreatePostVariant