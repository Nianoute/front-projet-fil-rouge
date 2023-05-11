import * as React from 'react';

export default function GetAllPostDesign({post}) {
    return (
        <div className='post'>
          <div className='postInfos'>
            <div className='postInfosPrimary'>
              <div className='postAvatar'>
                <img src=".img/post/default_imagePost.png" alt='avatar' />
              </div>
              <div className='postTitle'>
                <h2>{post.title}</h2>
              </div>
            </div>

            <div className='postInfosSecondary'>
              <p>{post.description}</p>
            </div>

            <div className='postInfosTertiary'>
              {post.author? 
                <p>auteur: {post.author.userName}, id: {post.author.id}</p>
              : <></>}
              {post.categories?.map((category, index)=> {
                return(
                  <p key={category.id}>catégorie {index + 1}: {category.name}</p>
                )
              })}
            </div>
          </div>

          <div className='postBouton'>
            <div className='postBoutonPol'>
              -PoL+
            </div>

            <div className='postBoutonComment'>
              -Comment-
            </div>

            <div className='postBoutonUrl'>
              -Url-
            </div>
          </div>
        </div>
    );
  }