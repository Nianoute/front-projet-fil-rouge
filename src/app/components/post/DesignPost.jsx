import * as React from 'react';

export default function GetAllPostDesign({post}) {
    return (
        <div>Le titre: {post.title}
          <ul>
            <li>la desc: {post.description}</li>
            <li>l'id: {post.id}</li>
            <li>auteur: {post.author.userName}</li>
            {post.categories?.map((category, index)=> {
              return(
                <li key={category.id}>catégorie {index + 1}: {category.name}</li>
              )
            })}
          </ul>
        </div>
    );
  }